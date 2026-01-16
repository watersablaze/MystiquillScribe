'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './new.module.css';
import PreviewPane from './PreviewPane';
import RevisionViewer from '../components/RevisionViewer';

/* ---------------- Types ---------------- */

type Mode = 'create' | 'edit';
type Status = 'idle' | 'saving' | 'saved' | 'error';

type Draft = {
  id: string | null;
  title: string;
  slug: string;
  content: string;
  category: string;
  tags: string;
  published: boolean;
  archived: boolean;
  accessType: 'OPEN' | 'PATRON' | 'GUIDED';

  heroImage?: string;

  guidedIntro?: string;
  guidedTitle?: string;
  guidedMeta?: string;
  guidedImageUrl?: string;
};

type Revision = {
  id: string;
  title: string;
  createdAt: string;
};

/* ---------------- Utils ---------------- */

function toSlug(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function debounce<T extends (...args: any[]) => void>(fn: T, wait: number) {
  let t: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<T>) => {
    if (t) clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
}

/* ---------------- Component ---------------- */

export default function ScribeEditor({
  initial,
  revisions: initialRevisions = [],
  mode = 'create',
}: {
  initial?: Partial<Draft>;
  revisions?: Revision[];
  mode?: Mode;
}) {
  const router = useRouter();

  const [draft, setDraft] = useState<Draft>({
    id: initial?.id ?? null,
    title: initial?.title ?? '',
    slug: initial?.slug ?? '',
    content: initial?.content ?? '',
    category: initial?.category ?? '',
    tags: initial?.tags ?? '',
    published: initial?.published ?? false,
    archived: initial?.archived ?? false,
    accessType: initial?.accessType ?? 'OPEN',

    heroImage: initial?.heroImage ?? '',

    guidedIntro: initial?.guidedIntro ?? '',
    guidedTitle: initial?.guidedTitle ?? '',
    guidedMeta: initial?.guidedMeta ?? '',
    guidedImageUrl: initial?.guidedImageUrl ?? '',
  });

  const [status, setStatus] = useState<Status>('idle');
  const [dirty, setDirty] = useState(false);
  const [collapsing, setCollapsing] = useState(false);
  const [writing, setWriting] = useState(false);

  const [lastSavedSlug, setLastSavedSlug] = useState(draft.slug || '');
  const [lastSavedAt, setLastSavedAt] = useState('');

  const slugTouchedRef = useRef(Boolean(draft.slug));
  const publishingRef = useRef(false);
  const writingTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [revisions, setRevisions] = useState<Revision[]>(initialRevisions);

  const resting =
    !writing &&
    !dirty &&
    (draft.title.trim() || draft.content.trim());

  function update<K extends keyof Draft>(field: K, value: Draft[K]) {
    setDraft((d) => ({ ...d, [field]: value }));
    setDirty(true);

    setWriting(true);
    if (writingTimeout.current) clearTimeout(writingTimeout.current);
    writingTimeout.current = setTimeout(() => setWriting(false), 1200);
  }

  /* ---------------- Slug auto-gen ---------------- */

  useEffect(() => {
    if (!draft.title.trim()) return;
    if (slugTouchedRef.current) return;
    if (draft.slug) return;

    setDraft((d) => ({ ...d, slug: toSlug(draft.title) }));
    setDirty(true);
  }, [draft.title]);

  /* ---------------- Persistence ---------------- */

  async function persist(
    next: Draft,
    opts?: { silent?: boolean; forcePublish?: boolean }
  ) {
    const silent = opts?.silent ?? false;
    const forcePublish = opts?.forcePublish ?? false;

    if (!silent) setStatus('saving');

    try {
      const res = await fetch('/api/scribe/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...next,
          published: forcePublish ? true : next.published,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (!silent) setStatus('error');
        return { ok: false as const };
      }

      setDraft((d) => ({
        ...d,
        id: data.entry.id,
        slug: data.entry.slug,
        published: data.entry.published,
        archived: data.entry.archived,
      }));

      if (data.entry.published) {
        try {
          const res = await fetch(
            `/api/scribe/revisions?entryId=${data.entry.id}`
          );
          setRevisions(await res.json());
        } catch {}
      }

      setLastSavedSlug(data.entry.slug);
      setLastSavedAt(new Date().toLocaleTimeString());
      setDirty(false);
      if (!silent) setStatus('saved');

      return { ok: true as const, entry: data.entry };
    } catch {
      if (!silent) setStatus('error');
      return { ok: false as const };
    }
  }

  const autosave = useMemo(
    () =>
      debounce(async (nextDraft: Draft) => {
        if (publishingRef.current) return;
        if (!nextDraft.title && !nextDraft.content) return;
        await persist(nextDraft, { silent: true });
      }, 1200),
    []
  );

  useEffect(() => {
    if (dirty) autosave(draft);
  }, [dirty, draft, autosave]);

  /* ---------------- Publish ---------------- */

  async function onPublishClick() {
    if (publishingRef.current) return;
    publishingRef.current = true;

    setStatus('saving');
    await new Promise((r) => setTimeout(r, 480));
    setCollapsing(true);

    const result = await persist(
      { ...draft, published: true },
      { forcePublish: true }
    );

    if (result.ok) {
      setTimeout(() => {
        router.replace(`/odyssey/${result.entry.slug}`);
      }, 700);
    } else {
      setCollapsing(false);
    }

    publishingRef.current = false;
  }

  const saveLabel =
    status === 'saving'
      ? 'Saving…'
      : status === 'saved'
      ? 'Saved'
      : 'Save Draft';

  /* ---------------- Render ---------------- */

  return (
    <div
      className={[
        styles.splitShell,
        writing ? styles.writing : '',
        resting ? styles.resting : '',
        collapsing ? styles.collapse : '',
      ].join(' ')}
    >
      {/* LEFT — EDITOR */}
      <div className={styles.editorPane}>
        <h1 className={styles.heading}>
          {mode === 'edit' ? 'Edit Odyssey Entry' : 'New Odyssey Entry'}
        </h1>

        <span className={styles.badge}>
          {draft.archived
            ? 'Archived'
            : draft.published
            ? 'Sealed — revisions preserved'
            : dirty
            ? 'In Motion'
            : 'Resting'}
        </span>

        {/* Access type */}
        <div className={styles.field}>
          <label className={styles.labelText}>Entry Type</label>
          <select
            value={draft.accessType}
            onChange={(e) =>
              update('accessType', e.target.value as Draft['accessType'])
            }
          >
            <option value="OPEN">Open — Public</option>
            <option value="PATRON">Patron — Supported</option>
            <option value="GUIDED">Guided — Held</option>
          </select>
        </div>

        {draft.accessType === 'GUIDED' && (
          <>
            <div className={styles.field}>
              <label className={styles.labelText}>Threshold Image</label>
              <input
                value={draft.guidedImageUrl ?? ''}
                onChange={(e) =>
                  update('guidedImageUrl', e.target.value)
                }
                placeholder="/odyssey/langa-field.jpg"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.labelText}>Guided Intro</label>
              <textarea
                value={draft.guidedIntro ?? ''}
                onChange={(e) => update('guidedIntro', e.target.value)}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.labelText}>Guided Title</label>
              <input
                value={draft.guidedTitle ?? ''}
                onChange={(e) => update('guidedTitle', e.target.value)}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.labelText}>Guided Context</label>
              <textarea
                value={draft.guidedMeta ?? ''}
                onChange={(e) => update('guidedMeta', e.target.value)}
              />
            </div>
          </>
        )}

        <div className={styles.field}>
          <label className={styles.labelText}>Hero Image</label>
          <input
            value={draft.heroImage ?? ''}
            onChange={(e) => update('heroImage', e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.labelText}>Title</label>
          <input
            value={draft.title}
            onChange={(e) => update('title', e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.labelText}>Slug</label>
          <input
            value={draft.slug}
            onChange={(e) => {
              slugTouchedRef.current = true;
              update('slug', e.target.value);
            }}
          />
        </div>

        {draft.published && (
          <RevisionViewer revisions={revisions} slug={draft.slug} />
        )}

        <div className={styles.field}>
          <label className={styles.labelText}>Content</label>
          <textarea
            value={draft.content}
            onChange={(e) => update('content', e.target.value)}
          />
        </div>

        <div className={styles.controlsRow}>
          <label className={styles.archiveToggle}>
            <input
              type="checkbox"
              checked={draft.archived}
              onChange={(e) => update('archived', e.target.checked)}
            />
            <span>Archive</span>
          </label>

          <button
            className={styles.saveButton}
            onClick={() => persist(draft)}
          >
            {saveLabel}
          </button>

          <button
            className={styles.publishButton}
            onClick={onPublishClick}
            disabled={!draft.title || !draft.content}
          >
            Publish
          </button>
        </div>

        <div className={styles.statusRow}>
          {lastSavedSlug && (
            <span>
              Last saved: {lastSavedSlug}
              {lastSavedAt && ` · ${lastSavedAt}`}
            </span>
          )}
        </div>
      </div>

      {/* RIGHT — PREVIEW */}
      <div
        className={[
          styles.previewPane,
          resting ? styles.previewResting : '',
        ].join(' ')}
      >
        <PreviewPane
          markdown={draft.content}
          title={draft.title || 'Untitled'}
        />
      </div>
    </div>
  );
}