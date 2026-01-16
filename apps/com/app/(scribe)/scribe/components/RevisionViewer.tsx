'use client';

import { useState } from 'react';
import styles from './RevisionViewer.module.css';

type Revision = {
  id: string;
  title: string;
  excerpt: string | null;
  createdAt: string;
};

export default function RevisionViewer({
  revisions,
}: {
  revisions: Revision[];
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
        onClick={() => setOpen(!open)}
      >
        <span>
          Revisions ({revisions.length})
        </span>
        <span className={styles.chevron}>
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

              {rev.excerpt && (
                <p className={styles.excerpt}>
                  {rev.excerpt}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}