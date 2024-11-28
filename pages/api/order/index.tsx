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
  if (req.method === 'GET') {
    const { id } = req.query

    if (!id) {
      // list all orders for the current user
      const orders = await prisma.order.findMany({
        // @ts-ignore
        where: { userId: Number(session.id) }
      })

      return res.status(200).json({ orders })
    }

    const order = await prisma.order.findFirst({
      where: { userId: Number(id) }
    })

    return res.status(200).json({ order })
  } if (req.method === 'POST') {
    // create a new order
    const { items } = req.body

    const order = await prisma.order.create({
      data: {
        // @ts-ignore
        userId: Number(session.id),
        total: items.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0)
      }
    })

    const orderItems = items.map((item: any) => ({
      orderId: order.id,
      productId: item.id,
      quantity: item.quantity
    }))

    console.log(orderItems)

    await prisma.orderItem.createMany({
      data: orderItems
    })

    return res.status(201).json({ message: 'Order created', result: order })
  }
}
