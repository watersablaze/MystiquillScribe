import Link from 'next/link'

import styles from './apply.module.css'
import { PartnerApplyForm } from './PartnerApplyForm'

const partnerTypes = [
  {
    label: 'Creative Collaborator',
    value: 'CREATIVE_COLLABORATOR',
  },
  {
    label: 'Patron / Supporter',
    value: 'PATRON',
  },
  {
    label: 'Institutional Partner',
    value: 'INSTITUTIONAL',
  },
  {
    label: 'Commission Inquiry',
    value: 'COMMISSION',
  },
  {
    label: 'Contributor / Operator',
    value: 'CONTRIBUTOR',
  },
  {
    label: 'Other',
    value: 'OTHER',
  },
] as const

const readinessOptions = [
  'Immediate / urgent',
  'This season',
  'Long-range',
  'Exploratory',
]

export default function PartnerApplyPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.kicker}>Begin with Intention</p>

        <h1 className={styles.title}>Enter the Partnership Threshold</h1>

        <p className={styles.subtitle}>
          This form is the first gate for those seeking to collaborate with,
          support, commission, contribute to, or build beside Mystiquill.
        </p>

        <Link href="/partner" className={styles.backLink}>
          Return to the threshold
        </Link>
      </section>

      <section className={styles.formShell}>
        <div className={styles.formIntro}>
          <p className={styles.eyebrow}>The first offering is clarity.</p>

          <h2>Let the intention take form.</h2>

          <p>
            You do not need to have every detail finalized. You do need enough
            clarity to name what you are approaching with, what you are seeking,
            and what kind of exchange you believe is possible.
          </p>
        </div>

        <PartnerApplyForm />
         </section>
        </main>
       )
      }