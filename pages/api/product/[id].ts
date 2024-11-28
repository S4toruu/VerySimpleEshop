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

    const { id } = req.query

    if (!id || Array.isArray(id)) {
      return res.status(400).json({ message: 'Invalid product ID' })
    }

    const product = await prisma.product.findUnique({
      where: { id: Number(id) }
    })

    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }

    res.status(200).json(product)
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong. Please try again.' })
  } finally {
    await prisma.$disconnect()
  }
}
