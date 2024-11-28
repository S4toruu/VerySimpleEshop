import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { authOptions } from 'pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth/next'

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions)
  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }
  const { id } = req.query

  if (!id) {
    return res.status(400).json({ message: 'Missing id' })
  }

  const order = await prisma.order.findFirst({
    // @ts-ignore
    where: { userId: Number(session.id), id: Number(id) }
  })

  if (!order) {
    return res.status(404).json({ message: 'Order not found' })
  }
  return res.status(200).json({ order })
}
