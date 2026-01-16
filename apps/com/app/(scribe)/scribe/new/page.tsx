import ScribeEditor from './ScribeEditor';
import styles from './new.module.css';

export default function NewEntryPage() {
  return (
    <main className={styles.scribeShell}>
      <div className={styles.vignette} aria-hidden="true" />
      <ScribeEditor />
    </main>
  );
}