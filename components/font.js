import { Inter, Overpass, Anton, Rubik } from 'next/font/google'

export const inter = Inter({ subsets: ['latin'] })

export const overpass = Overpass({
  weight: ['400', '800'],
  subsets: ['latin']
})

export const anton = Anton({
  weight: ['400'],
  subsets: ['latin']
})

export const rubik = Rubik({
  weight: ['400', '700'],
  subsets: ['latin']
})
