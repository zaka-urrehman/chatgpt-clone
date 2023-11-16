
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import SideBar from '@/components/views/sideBar'
import AuthProvider from '../components/utils/sessionProvider'
import { getServerSession } from 'next-auth'
import { authOptions } from "../app/api/auth/[...nextauth]/route"
import Login from '@/components/views/login'
import ClientProvider from '@/components/utils/clientProvider'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const Session = await getServerSession(authOptions)

  return (
    <html lang="en"  >
      <body  >
        <AuthProvider session={Session}>
          {!Session ?
            <div><Login /></div>
            :
            <div>
              <div className='md:grid md:grid-cols-[1fr,4fr] '>
                {/* Sidebar */}
                <SideBar />

                <div>
                  <ClientProvider />
                  {children}
                </div>
              </div>
            </div>
          }

        </AuthProvider>

      </body>
    </html>
  )
}
