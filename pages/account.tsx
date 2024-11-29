import React from 'react'
import Head from 'next/head'

import { Layout } from 'components/layout'
import { CardOrders } from 'components/molecules/card-orders'

export default function LoginPage() {
  return (
    <Layout>
      <Head>
        <title>Login</title>
      </Head>
      <CardOrders />
    </Layout>
  )
}
