import { useState } from 'react'
import { GetServerSidePropsResult } from 'next'
import Head from 'next/head'
import { Layout } from 'components/layout'
import { ProductTeaser } from 'components/entities/product-teaser'
import { Notification } from 'components/molecules/notification'
import { PrismaClient, Product } from '@prisma/client'
import { useCart } from 'utils/cart-context'

const prisma = new PrismaClient()

interface ProductsProps {
  products: Product[]
}

export default function Products({ products }: ProductsProps) {
  const { addToCart } = useCart()
  const [notification, setNotification] = useState({ show: false, message: '' })

  const handleAddToCart = (product) => {
    setNotification({ show: false, message: '' }) // Reset notification state
    setTimeout(() => {
      addToCart(product)
      setNotification({ show: true, message: `${product.name} added to cart` })
    }, 100) // Small delay to ensure state reset
  }

  return (
    <Layout>
      <Head>
        <title>My VerySimpleEshop</title>
        <meta
          name="description"
          content="A Next.js site powered by My VerySimpleEshop."
        />
      </Head>
      <Notification message={notification.message} show={notification.show} />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {products?.length ? (
          products.map((product) => (
            <div key={product.id}>
              <ProductTeaser product={product} onAddToCart={() => handleAddToCart(product)} />
            </div>
          ))
        ) : (
          <p className="py-4">No products found</p>
        )}
      </div>
    </Layout>
  )
}

export async function getServerSideProps(context): Promise<GetServerSidePropsResult<ProductsProps>> {
  let products = []
  if (context.query.type) {
    products = await prisma.product.findMany({
      where: {
        type: context.query.type
      }
    })
  } else {
    products = await prisma.product.findMany()
  }

  return {
    props: {
      products
    }
  }
}
