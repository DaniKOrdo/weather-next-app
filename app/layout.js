import { Analytics } from '@vercel/analytics/react'
import { rubik } from '@/components/font.js'
import './globals.css'
import Head from './Head'

export const metadata = {
  title: 'Weather Next App',
  description: 'Weather Next App'
}

export default function RootLayout ({ children }) {
  return (
    <html lang='en'>
      <Head />
      <script
        async
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_KEY}&language=en&components=locality&libraries=places&callback=myCallbackFunc`}
      />
      <body className={rubik.className}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
