import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function truncateDatabase() {
  await prisma.orderItem.deleteMany({})
  await prisma.order.deleteMany({})
  await prisma.product.deleteMany({})
  await prisma.userAddress.deleteMany({})
  await prisma.user.deleteMany({})
}

async function main() {
  await truncateDatabase()

  const hashedPassword = await bcrypt.hash('user', 10)

  await prisma.user.create({
    data: {
      name: 'Default User',
      mail: 'user@example.com',
      password: hashedPassword
    }
  })

  await prisma.product.createMany({
    data: [
      {
        name: 'Apple iPhone 14',
        type: 'Smartphone',
        description: 'Latest model of Apple iPhone with advanced features.',
        image: 'https://placehold.co/400x400.png',
        stock: 50,
        price: 999.99
      },
      {
        name: 'Samsung Galaxy S22',
        type: 'Smartphone',
        description: 'High-end smartphone from Samsung with powerful performance.',
        image: 'https://placehold.co/400x400.png',
        stock: 40,
        price: 899.99
      },
      {
        name: 'Sony WH-1000XM4',
        type: 'Headphones',
        description: 'Noise-cancelling over-ear headphones with superior sound quality.',
        image: 'https://placehold.co/400x400.png',
        stock: 30,
        price: 349.99
      },
      {
        name: 'Dell XPS 13',
        type: 'Laptop',
        description: 'Compact and powerful laptop with a stunning display.',
        image: 'https://placehold.co/400x400.png',
        stock: 20,
        price: 1299.99
      },
      {
        name: 'LG OLED55CXPUA',
        type: 'Screen',
        description: '55-inch OLED TV with stunning picture quality and smart features.',
        image: 'https://placehold.co/400x400.png',
        stock: 15,
        price: 1499.99
      },
      {
        name: 'HP Spectre x360',
        type: 'Laptop',
        description: 'Versatile 2-in-1 laptop with a sleek design and powerful performance.',
        image: 'https://placehold.co/400x400.png',
        stock: 25,
        price: 1399.99
      },
      {
        name: 'Google Pixel 6',
        type: 'Smartphone',
        description: 'Latest Google smartphone with advanced AI features and great camera.',
        image: 'https://placehold.co/400x400.png',
        stock: 35,
        price: 799.99
      },
      {
        name: 'Asus ROG Swift PG279Q',
        type: 'Screen',
        description: '27-inch gaming monitor with high refresh rate and G-Sync support.',
        image: 'https://placehold.co/400x400.png',
        stock: 10,
        price: 699.99
      }
    ]
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
