import 'tailwindcss/tailwind.css'
import Head from 'next/head'
import Header from '../components/Header'
import { getSession } from 'next-auth/client'

export default function Home({ session }) {
  return (
    <div>
      <Head>
        <title>Facebook</title>
      </Head>

      <Header />

      <main>
        {/* Sidebar */}
        {/* Feed */}
        {/* Widgets */}
      </main>
    </div>
  )
}

export async function getServerSideProps(context) {
  // get the user
  const session = await getSession(context);

  return {
    props: {
      session
    }
  }
}
