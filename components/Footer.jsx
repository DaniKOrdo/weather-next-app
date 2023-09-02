import { useEffect } from 'react'

export default function Footer ({ data }) {
  console.log(data)

  const { name, country } = data.location
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const orientation = window.innerWidth > window.innerHeight ? 'landscape' : 'portrait'
        const query = orientation === 'landscape' ? 'orientation=landscape' : 'orientation=portrait'

        const response = await fetch(`https://api.unsplash.com/search/photos?page=1&query=${name}-${country}&${query}&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_KEY}`)
        const data = await response.json()
        console.log(data)

        if (data.results && data.results.length > 0) {
          const randomIndex = Math.floor(Math.random() * data.results.length)
          const imageUrl = data.results[randomIndex].urls.regular
          document.body.style.backgroundImage = `url(${imageUrl})`
          document.body.style.backgroundSize = 'cover'
        }
      } catch (error) {
        console.error('Error fetching image:', error)
      }
    }

    fetchImage()
  }, [name, country])

  return (
    <footer>
      test
    </footer>
  )
}
