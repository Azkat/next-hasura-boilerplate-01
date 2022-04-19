import { Auth } from '../components/Auth'
import { Layout } from '../components/Layout'

export default function Home() {
  return (
    <Layout title="Home">
      <p className="mb-5 text-blue-500 text-xl">News list by SSG</p>

      <Auth />
    </Layout>
  )
}
