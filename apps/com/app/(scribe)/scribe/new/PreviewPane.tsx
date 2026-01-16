'use client';

import { useMemo } from 'react';
import MarkdownIt from 'markdown-it';
import styles from './new.module.css';

const md = new MarkdownIt({ html: false, linkify: true, breaks: true });

export default function PreviewPane({
  markdown,
  title,
}: {
  markdown: string;
  title: string;
}) {
  const html = useMemo(() => {
    if (!markdown?.trim()) {
      return '<p><em>Begin writing to see the vellum take shape…</em></p>';
    }
    return md.render(markdown);
  }, [markdown]);

  return (
    <div className={styles.previewCard}>
      <div className={styles.previewHeader}>
        <p className={styles.previewKicker}>Odyssey · Live Preview</p>
        <h2 className={styles.previewTitle}>{title}</h2>
        <div className={styles.previewRule} />
      </div>

      <article
        className={`${styles.previewBody} ${
          markdown ? styles.previewActive : ''
        }`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}