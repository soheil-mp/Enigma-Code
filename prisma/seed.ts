import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create subscription plans
  const plans = [
    {
      planName: 'Free',
      description: 'Basic features for getting started',
      price: 0,
      features: {
        resumeLimit: 1,
        applicationLimit: 10,
        interviewPractice: true,
        automatedApplications: false,
        marketInsights: false,
      },
    },
    {
      planName: 'Pro',
      description: 'Advanced features for serious job seekers',
      price: 9.99,
      features: {
        resumeLimit: 5,
        applicationLimit: 100,
        interviewPractice: true,
        automatedApplications: true,
        marketInsights: true,
      },
    },
  ]

  for (const plan of plans) {
    await prisma.subscriptionPlan.upsert({
      where: { planName: plan.planName },
      update: {},
      create: plan,
    })
  }

  // Create a test user
  const testUser = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      name: 'Test User',
      password: await hash('password123', 12),
      subscriptionPlan: 'Free',
    },
  })

  console.log({ testUser })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 