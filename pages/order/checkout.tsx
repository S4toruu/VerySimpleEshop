import React from 'react'
import Head from 'next/head'

import { Layout } from 'components/layout'
import { Checkout } from 'components/molecules/checkout'
import { PriceTable } from 'components/molecules/price-table'

export default function CheckoutPage() {
  return (
    <Layout>
      <Head>
        <title>My Cart | Checkout</title>
      </Head>
      <div className="grid grid-cols-1 xl:grid-cols-2 py-5 gap-6">
        <Checkout />
        <PriceTable />
      </div>
    </Layout>
  )
}
