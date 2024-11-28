import React from 'react'
import Head from 'next/head'

import { Layout } from 'components/layout'
import { DeliveryMap } from 'components/molecules/delivery-map'
import { PriceTable } from 'components/molecules/price-table'

export default function CheckoutPage() {
  return (
    <Layout>
      <Head>
        <title>Order summary | Checkout</title>
      </Head>
      <div className="grid grid-cols-1 xl:grid-cols-2 py-5 gap-6">
        <DeliveryMap />
        <PriceTable />
      </div>
    </Layout>
  )
}
