import { useEffect } from 'react'

export default function useSEO({ title, description, canonical }: { title?: string; description?: string; canonical?: string }) {
  useEffect(() => {
    if (title) document.title = title
    if (description) {
      let desc = document.querySelector('meta[name="description"]')
      if (!desc) {
        desc = document.createElement('meta')
        desc.setAttribute('name', 'description')
        document.head.appendChild(desc)
      }
      desc.setAttribute('content', description)
    }
    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]')
      if (!link) {
        link = document.createElement('link')
        link.setAttribute('rel', 'canonical')
        document.head.appendChild(link)
      }
      link.setAttribute('href', canonical)
    }
  }, [title, description, canonical])
}
