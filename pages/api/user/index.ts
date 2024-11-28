import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Only accept POST requests.
    if (req.method !== 'POST') {
      return res.status(405).end()
    }

    const { name, mail, password } = req.body

    if (!name || !mail || !password) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create a new user in the database
    const newUser = await prisma.user.create({
      data: {
        name,
        mail,
        password: hashedPassword
      }
    })

    res.status(201).json(newUser)
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong. Please try again.' })
  } finally {
    await prisma.$disconnect()
  }
}
