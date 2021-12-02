import { ReactNode } from 'react'
import Header from '@components/Header'
import Footer from '@components/Footer'
import Helmet from '@components/Helmet'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className='layout'>
        <Helmet />
        <Header />
        <main>{children}</main>
        <Footer />
      </div>

      <style jsx>{`
        main {
          flex: 1 0 auto;
        }

        .layout {
          display: flex;
          flex-direction: column;
          margin: 0 auto;
          max-width: 1300px;
          padding: 0 1.5rem;
          min-height: 100vh;
        }
      `}</style>
    </>
  )
}
