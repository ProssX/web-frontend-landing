import { useEffect } from 'react'
import FAQ from '../components/FAQ'

export default function FAQPage() {
  useEffect(() => { document.title = 'Preguntas frecuentes — Proocess' }, [])
  return <FAQ />
}
