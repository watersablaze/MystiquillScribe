import { z } from 'zod'

const optionalText = z
  .string()
  .trim()
  .optional()
  .transform((value) => (value === '' ? undefined : value))

const optionalUrl = z
  .string()
  .trim()
  .optional()
  .transform((value) => (value === '' ? undefined : value))
  .pipe(z.string().url().optional())

export const partnerIntakeSchema = z.object({
  name: z.string().trim().min(2, 'Name is required.'),
  email: z.string().trim().email('A valid email is required.'),

  location: optionalText,
  website: optionalUrl,
  organization: optionalText,

  partnerType: z.enum([
    'CREATIVE_COLLABORATOR',
    'PATRON',
    'INSTITUTIONAL',
    'COMMISSION',
    'CONTRIBUTOR',
    'OTHER',
  ]),

  readiness: z.string().trim().min(1, 'Readiness is required.'),

  intention: z
    .string()
    .trim()
    .min(20, 'Please share at least a few sentences of intention.'),

  alignment: optionalText,
  offering: optionalText,
  needs: optionalText,

  timeline: optionalText,
  budget: optionalText,
  materials: optionalText,
  peopleInvolved: optionalText,

  scopeAgreement: z.boolean().refine((value) => value === true, {
    message: 'Written scope agreement must be acknowledged.',
  }),

  creditAgreement: z.boolean().refine((value) => value === true, {
    message: 'Credit and ownership agreement must be acknowledged.',
  }),

  trialAgreement: z.boolean().refine((value) => value === true, {
    message: 'Trial phase agreement must be acknowledged.',
  }),
})

export type PartnerIntakeInput = z.infer<typeof partnerIntakeSchema>