import Head from 'next/head'
import { GetServerSidePropsResult } from 'next'
import { Layout } from 'components/layout'

interface IndexPageProps {
  products: [],
}

export default function IndexPage({ products }: IndexPageProps) {
  console.log(products)
  return (
    <Layout>
      <Head>
        <title>Next.js for Drupal</title>
        <meta
          name="description"
          content="A Next.js site powered by a Drupal backend."
        />
      </Head>
      <div />
    </Layout>
  )
}

export async function getServerSideProps(context): Promise<GetServerSidePropsResult<IndexPageProps>> {
  console.log(context)
  return {
    props: {
      products: []
    }
  }
}
