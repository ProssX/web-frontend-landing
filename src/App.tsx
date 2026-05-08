import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Problema, { TOTAL_VH as PROBLEMA_VH } from './components/Problema'

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <div style={{ height: `calc(${PROBLEMA_VH}vh + 100vh)` }}>
        <Problema />
      </div>
    </>
  )
}
