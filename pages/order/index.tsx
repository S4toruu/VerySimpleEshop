import React from 'react'
import Head from 'next/head'

import { Layout } from 'components/layout'
import { Cart } from 'components/molecules/cart'
import { PriceTable } from 'components/molecules/price-table'

export default function CartPage() {
  return (
    <Layout>
      <Head>
        <title>My Cart</title>
      </Head>
      <div className="grid grid-cols-1 xl:grid-cols-2 py-5 gap-6">
        <Cart />
        <PriceTable />
      </div>
    </Layout>
  )
}
