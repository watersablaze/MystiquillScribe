import Link from 'next/link'

import styles from './partner.module.css'

const approachPaths = [
  {
    title: 'Creative Collaboration',
    text:
      'For artists, writers, musicians, filmmakers, researchers, technologists, and vision-holders seeking to create something with Mystiquill.',
  },
  {
    title: 'Patronage & Support',
    text:
      'For those who wish to resource the work without needing creative control, authorship, or operational access.',
  },
  {
    title: 'Institutional Partnership',
    text:
      'For studios, cultural spaces, schools, organizations, platforms, and aligned entities seeking structured exchange.',
  },
  {
    title: 'Commissions',
    text:
      'For individuals or entities seeking Mystiquill’s language, design, strategy, ritual architecture, creative direction, or digital craft.',
  },
  {
    title: 'Contributor / Operator Roles',
    text:
      'For those who may support the archive, production, development, research, editing, systems, or stewardship of the wider organism.',
  },
]

const gates = [
  'Intention',
  'Alignment',
  'Scope',
  'Trial',
  'Agreement',
  'Activation',
]

const protections = [
  'Creative sovereignty',
  'Sacred material',
  'Authorship and credit',
  'Emotional bandwidth',
  'Intellectual property',
  'Time and attention',
  'Reciprocity',
  'The integrity of the work',
]

export default function PartnerPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.kicker}>Mystiquill Partner OS</p>

        <h1 className={styles.title}>The Partnership Threshold</h1>

        <p className={styles.subtitle}>
          A structured entrance for aligned collaborators, patrons,
          institutions, commissioners, and contributors seeking to build with
          Mystiquill.
        </p>

        <div className={styles.heroActions}>
          <Link href="/partner/apply" className={styles.primaryLink}>
            Begin with Intention
          </Link>

          <a href="#paths" className={styles.secondaryLink}>
            View the pathways
          </a>
        </div>
      </section>

      <section className={styles.statementSection}>
        <div className={styles.statementCard}>
          <p className={styles.eyebrow}>Why this exists</p>

          <h2>Access requires shape.</h2>

          <p>
            Mystiquill is a living creative fortress, archive, studio, and
            spiritual technology. Its work may move through art, language,
            ritual, film, music, design, software, study, and sovereign
            imagination.
          </p>

          <p>
            This threshold exists to protect clarity before energy is exchanged.
            Collaboration is welcome here, but it does not begin in vagueness.
            It begins with intention.
          </p>
        </div>
      </section>

      <section id="paths" className={styles.pathsSection}>
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrow}>Ways to approach</p>
          <h2>Different doors require different keys.</h2>
          <p>
            Not every relationship enters through the same passage. Mystiquill
            distinguishes between collaboration, patronage, institutional
            exchange, commissioned work, and operational contribution.
          </p>
        </div>

        <div className={styles.pathGrid}>
          {approachPaths.map((path) => (
            <article key={path.title} className={styles.pathCard}>
              <h3>{path.title}</h3>
              <p>{path.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.gatesSection}>
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrow}>The gate process</p>
          <h2>From impulse to living agreement.</h2>
          <p>
            The process is designed to prevent unclear access, premature
            commitment, energetic leakage, and unspoken expectation.
          </p>
        </div>

        <ol className={styles.gateList}>
          {gates.map((gate, index) => (
            <li key={gate} className={styles.gateItem}>
              <span className={styles.gateNumber}>
                {String(index + 1).padStart(2, '0')}
              </span>
              <span>{gate}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.protectionSection}>
        <div className={styles.protectionText}>
          <p className={styles.eyebrow}>What Mystiquill protects</p>
          <h2>The sanctum is protected so the work may serve.</h2>
          <p>
            Boundaries are not a withdrawal of generosity. They are the
            architecture that allows generosity to remain clean, lucid, and
            durable.
          </p>
        </div>

        <ul className={styles.protectionList}>
          {protections.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className={styles.finalCta}>
        <p className={styles.kicker}>The first offering is clarity.</p>
        <h2>If your intention is clear enough to be written, it is ready to be received.</h2>
        <Link href="/partner/apply" className={styles.primaryLink}>
          Begin with Intention
        </Link>
      </section>
    </main>
  )
}