import { NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'
import { partnerIntakeSchema } from '@/lib/validation/partner-intake'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const data = partnerIntakeSchema.parse(body)

    const inquiry = await prisma.mystiquillPartnerInquiry.create({
      data: {
        name: data.name,
        email: data.email,
        location: data.location,
        website: data.website,
        organization: data.organization,

        partnerType: data.partnerType,
        readiness: data.readiness,

        intention: data.intention,
        alignment: data.alignment,
        offering: data.offering,
        needs: data.needs,

        timeline: data.timeline,
        budget: data.budget,
        materials: data.materials,
        peopleInvolved: data.peopleInvolved,

        scopeAgreement: data.scopeAgreement,
        creditAgreement: data.creditAgreement,
        trialAgreement: data.trialAgreement,
      },
    })

    return NextResponse.json({
      ok: true,
      inquiryId: inquiry.id,
    })
  } catch (error) {
    console.error('[partner-intake:create]', error)

    return NextResponse.json(
      {
        ok: false,
        error: 'Unable to submit partner intention.',
      },
      { status: 400 },
    )
  }
}