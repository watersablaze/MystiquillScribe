'use client'

import { useState } from 'react'

import styles from './apply.module.css'
import { useRef, useState } from 'react'

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
] as const

type SubmitState = {
  status: 'idle' | 'success' | 'error'
  message: string
}

export function PartnerApplyForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const statusRef = useRef<HTMLParagraphElement | null>(null)
  const [submitState, setSubmitState] = useState<SubmitState>({
    status: 'idle',
    message: '',
  })

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)

    setIsSubmitting(true)
    setSubmitState({
      status: 'idle',
      message: '',
    })

    const payload = {
      name: String(formData.get('name') ?? ''),
      email: String(formData.get('email') ?? ''),
      location: String(formData.get('location') ?? ''),
      website: String(formData.get('website') ?? ''),
      organization: String(formData.get('organization') ?? ''),

      partnerType: String(formData.get('partnerType') ?? ''),
      readiness: String(formData.get('readiness') ?? ''),

      intention: String(formData.get('intention') ?? ''),
      alignment: String(formData.get('alignment') ?? ''),
      offering: String(formData.get('offering') ?? ''),
      needs: String(formData.get('needs') ?? ''),

      timeline: String(formData.get('timeline') ?? ''),
      budget: String(formData.get('budget') ?? ''),
      materials: String(formData.get('materials') ?? ''),
      peopleInvolved: String(formData.get('peopleInvolved') ?? ''),

      scopeAgreement: formData.get('scopeAgreement') === 'on',
      creditAgreement: formData.get('creditAgreement') === 'on',
      trialAgreement: formData.get('trialAgreement') === 'on',
    }

    try {
      const response = await fetch('/api/partner-intake', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const result = (await response.json()) as {
        ok?: boolean
        error?: string
        inquiryId?: string
      }

      if (!response.ok || !result.ok) {
        throw new Error(result.error ?? 'Unable to submit partner intention.')
      }

      form.reset()

      setSubmitState({
        status: 'success',
        message:
          'Your intention has been received into the Mystiquill Partner Ledger.',
      })
      window.setTimeout(() => {
        statusRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
        })
        }, 50)
    } catch (error) {
      setSubmitState({
        status: 'error',
        message:
          error instanceof Error
            ? error.message
            : 'Unable to submit partner intention.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <fieldset className={styles.fieldset}>
        <legend>Identity</legend>

        <div className={styles.gridTwo}>
          <label className={styles.field}>
            <span>Name</span>
            <input
              type="text"
              name="name"
              placeholder="Your name"
              required
              minLength={2}
            />
          </label>

          <label className={styles.field}>
            <span>Email</span>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              required
            />
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
            <input type="url" name="website" placeholder="https://..." />
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
          <select name="partnerType" defaultValue="" required>
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
          <select name="readiness" defaultValue="" required>
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
            required
            minLength={20}
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
            <input type="checkbox" name="scopeAgreement" required />
            <span>
              I understand that active collaboration begins only after a written
              scope is defined.
            </span>
          </label>

          <label className={styles.checkField}>
            <input type="checkbox" name="creditAgreement" required />
            <span>
              I am willing to clarify authorship, ownership, credit, and
              compensation before valuable work begins.
            </span>
          </label>

          <label className={styles.checkField}>
            <input type="checkbox" name="trialAgreement" required />
            <span>
              I am open to beginning with a small contained trial phase before
              deeper access or commitment.
            </span>
          </label>
        </div>
      </fieldset>

      <div className={styles.submitBand}>
        <div>
          <p className={styles.submitKicker}>Submit to the Partner Ledger</p>
          <p>
            Submission begins review. It does not activate collaboration,
            access, or agreement.
          </p>
        </div>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Intention'}
        </button>
      </div>

        {submitState.status === 'success' ? (
        <p ref={statusRef} className={styles.successMessage}>
            {submitState.message}
        </p>
        ) : null}

        {submitState.status === 'error' ? (
        <p ref={statusRef} className={styles.errorMessage}>
            {submitState.message}
        </p>
        ) : null}
    </form>
  )
}