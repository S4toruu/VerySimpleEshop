import { NextApiRequest, NextApiResponse } from 'next'
import { authOptions } from 'pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth/next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await getServerSession(req, res, authOptions)
    if (!session) {
      return res.status(401).json({ message: 'Unauthorized' })
    }
    if (req.method === 'POST') {
      const {
        userId, street, city, state, zipCode, country
      } = req.body

      if (!userId || !street || !city || !state || !zipCode || !country) {
        return res.status(400).json({ message: 'All fields are required' })
      }

      const address = await prisma.userAddress.create({
        data: {
          userId: Number(userId),
          street: String(street),
          city: String(city),
          state: String(state),
          zipCode: String(zipCode),
          country: String(country)
        }
      })

      return res.status(201).json({ address })
    }
    return res.status(405).json({ message: 'Method not allowed' })
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong. Please try again.' })
  } finally {
    await prisma.$disconnect()
  }
}
