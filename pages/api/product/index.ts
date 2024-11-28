import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Only accept GET requests.
    if (req.method !== 'GET') {
      return res.status(405).end()
    }

    const products = await prisma.product.findMany()

    res.status(200).json(products)
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong. Please try again.' })
  } finally {
    await prisma.$disconnect()
  }
}
