import './globals.css'
import { overpass, rubik } from '@/components/font.js'

export const metadata = {
  title: 'Weather Next App',
  description: 'Weather Next App'
}

export default function RootLayout ({ children }) {
  return (
    <html lang='en'>
      <body className={rubik.className}>{children}</body>
    </html>
  )
}
