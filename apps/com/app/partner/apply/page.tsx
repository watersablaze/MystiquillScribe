import Link from 'next/link'

import styles from './apply.module.css'

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

        <form className={styles.form}>
          <fieldset className={styles.fieldset}>
            <legend>Identity</legend>

            <div className={styles.gridTwo}>
              <label className={styles.field}>
                <span>Name</span>
                <input type="text" name="name" placeholder="Your name" />
              </label>

              <label className={styles.field}>
                <span>Email</span>
                <input type="email" name="email" placeholder="you@example.com" />
              </label>
            </div>

            <div className={styles.gridTwo}>
              <label className={styles.field}>
                <span>Location / Timezone</span>
                <input
                  type="text"
                  name="location"
                  placeholder="City, country, timezone"
                />
              </label>

              <label className={styles.field}>
                <span>Website / Portfolio / Social</span>
                <input
                  type="url"
                  name="website"
                  placeholder="https://..."
                />
              </label>
            </div>

            <label className={styles.field}>
              <span>Organization, if applicable</span>
              <input
                type="text"
                name="organization"
                placeholder="Organization, studio, collective, or company"
              />
            </label>
          </fieldset>

          <fieldset className={styles.fieldset}>
            <legend>Approach Path</legend>

            <label className={styles.field}>
              <span>What kind of relationship are you approaching through?</span>
              <select name="partnerType" defaultValue="">
                <option value="" disabled>
                  Select a pathway
                </option>
                {partnerTypes.map((type) => (
                <option key={type.value} value={type.value}>
                    {type.label}
                </option>
                ))}
              </select>
            </label>

            <label className={styles.field}>
              <span>Readiness</span>
              <select name="readiness" defaultValue="">
                <option value="" disabled>
                  Select a rhythm
                </option>
                {readinessOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </fieldset>

          <fieldset className={styles.fieldset}>
            <legend>Intention</legend>

            <label className={styles.field}>
              <span>What are you approaching Mystiquill to explore?</span>
              <textarea
                name="intention"
                rows={5}
                placeholder="Name the project, possibility, offering, request, or exchange."
              />
            </label>

            <label className={styles.field}>
              <span>Why does this feel aligned?</span>
              <textarea
                name="alignment"
                rows={5}
                placeholder="Share the thread you sense between your work, need, vision, or organization and Mystiquill."
              />
            </label>

            <label className={styles.field}>
              <span>What do you bring to the table?</span>
              <textarea
                name="offering"
                rows={5}
                placeholder="Skills, resources, audience, funding, experience, space, research, production ability, devotion, or other forms of contribution."
              />
            </label>

            <label className={styles.field}>
              <span>What would you need from Mystiquill?</span>
              <textarea
                name="needs"
                rows={5}
                placeholder="Creative direction, writing, design, strategy, production, collaboration, ritual architecture, technical support, visibility, or another form of exchange."
              />
            </label>
          </fieldset>

          <fieldset className={styles.fieldset}>
            <legend>Structure</legend>

            <div className={styles.gridTwo}>
              <label className={styles.field}>
                <span>Timeline</span>
                <input
                  type="text"
                  name="timeline"
                  placeholder="Desired timeline or season"
                />
              </label>

              <label className={styles.field}>
                <span>Budget / Resources</span>
                <input
                  type="text"
                  name="budget"
                  placeholder="Budget range, resources, or TBD"
                />
              </label>
            </div>

            <label className={styles.field}>
              <span>Are there existing materials?</span>
              <textarea
                name="materials"
                rows={4}
                placeholder="Links, drafts, decks, notes, references, recordings, prototypes, or existing documents."
              />
            </label>

            <label className={styles.field}>
              <span>Who else is involved?</span>
              <textarea
                name="peopleInvolved"
                rows={4}
                placeholder="List collaborators, organizations, stakeholders, funders, producers, or decision-makers."
              />
            </label>
          </fieldset>

          <fieldset className={styles.fieldset}>
            <legend>Integrity Agreements</legend>

            <div className={styles.checkGroup}>
              <label className={styles.checkField}>
                <input type="checkbox" name="scopeAgreement" />
                <span>
                  I understand that active collaboration begins only after a
                  written scope is defined.
                </span>
              </label>

              <label className={styles.checkField}>
                <input type="checkbox" name="creditAgreement" />
                <span>
                  I am willing to clarify authorship, ownership, credit, and
                  compensation before valuable work begins.
                </span>
              </label>

              <label className={styles.checkField}>
                <input type="checkbox" name="trialAgreement" />
                <span>
                  I am open to beginning with a small contained trial phase
                  before deeper access or commitment.
                </span>
              </label>
            </div>
          </fieldset>

          <div className={styles.submitBand}>
            <div>
              <p className={styles.submitKicker}>Static draft state</p>
              <p>
                This form is currently visual only. Persistence will be wired in
                the next phase.
              </p>
            </div>

            <button type="button" className={styles.submitButton}>
              Submit Intention
            </button>
          </div>
        </form>
      </section>
    </main>
  )
}