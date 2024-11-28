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
    if (req.method !== 'GET') {
      return res.status(405).json({ message: 'Method not allowed' })
    }
    const { id } = req.query

    if (!id) {
      return res.status(400).json({ message: 'Email is required' })
    }

    const address = await prisma.userAddress.findFirst({
      where: { userId: Number(id) }
    })

    if (address) {
      return res.status(200).json({ result: [address] })
    }
    return res.status(200).json({ message: 'No address found for this user', result: [] })
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong. Please try again.' })
  } finally {
    await prisma.$disconnect()
  }
}
