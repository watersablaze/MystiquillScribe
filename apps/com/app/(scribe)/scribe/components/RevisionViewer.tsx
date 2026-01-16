'use client';

import { useState } from 'react';
import styles from './RevisionViewer.module.css';

type EntryRevision = {
  id: string;
  title: string;
  createdAt: string;
};

export default function RevisionViewer({
  revisions,
}: {
  revisions: EntryRevision[];
}) {
  const [open, setOpen] = useState(false);

  if (revisions.length === 0) return null;

  return (
    <section
      className={[
        styles.wrapper,
        open ? styles.open : '',
      ].join(' ')}
    >
      <button
        className={styles.toggle}
        onClick={() => setOpen((v) => !v)}
        type="button"
      >
        <span>
          Revisions ({revisions.length})
        </span>

        <span className={styles.chevron} aria-hidden>
          {open ? '▾' : '▸'}
        </span>
      </button>

      {open && (
        <div className={styles.drawer}>
          {revisions.map((rev, i) => (
            <div key={rev.id} className={styles.revision}>
              <div className={styles.meta}>
                <span className={styles.index}>
                  #{revisions.length - i}
                </span>

                <span className={styles.date}>
                  {new Date(rev.createdAt).toLocaleString()}
                </span>
              </div>

              <strong className={styles.title}>
                {rev.title}
              </strong>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}