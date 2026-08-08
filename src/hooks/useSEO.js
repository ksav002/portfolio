import { useEffect } from 'react'

const SITE_URL = 'https://poudelkeshab.com.np'

export function useSEO({ title, description, path = '/' }) {
  useEffect(() => {
    const fullTitle = `${title} — Keshab Poudel`
    const canonicalUrl = `${SITE_URL}${path}`

    document.title = fullTitle
    setMetaByName('description', description)
    setMetaByProperty('og:title', fullTitle)
    setMetaByProperty('og:description', description)
    setMetaByProperty('og:url', canonicalUrl)
    setMetaByProperty('og:type', 'website')
    setCanonical(canonicalUrl)

    return () => {
      const siteTitle = 'Keshab Poudel'
      document.title = siteTitle
      setMetaByProperty('og:title', siteTitle)
      setMetaByProperty('og:description', '')
      setMetaByName('description', '')
    }
  }, [title, description, path])
}

function setMetaByName(name, content) {
  let tag = document.querySelector(`meta[name="${name}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute('name', name)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

function setMetaByProperty(property, content) {
  let tag = document.querySelector(`meta[property="${property}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute('property', property)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

function setCanonical(url) {
  let link = document.querySelector('link[rel="canonical"]')
  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', 'canonical')
    document.head.appendChild(link)
  }
  link.setAttribute('href', url)
}
