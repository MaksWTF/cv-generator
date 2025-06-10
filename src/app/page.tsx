'use client'

import { useRef, useState } from 'react'

export default function Home() {
  const formRef = useRef<HTMLDivElement>(null)
  const [imie, setImie] = useState('')
  const [stanowisko, setStanowisko] = useState('')
  const [doswiadczenie, setDoswiadczenie] = useState('')
  const [umiejetnosci, setUmiejetnosci] = useState('')
  const [edukacja, setEdukacja] = useState('')
  const [kontakt, setKontakt] = useState('')
  const [wynik, setWynik] = useState('Brak odpowiedzi')
  const [generuje, setGeneruje] = useState(false)

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setGeneruje(true)

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imie, stanowisko, doswiadczenie, umiejetnosci, edukacja, kontakt })
      })

      const data = await response.json()
      setWynik(data.wynik)
    } catch {
      setWynik('Wystąpił błąd przy generowaniu.')
    } finally {
      setGeneruje(false)
    }
  }

  return (
    <div>
      {/* Sekcja powitalna */}
      <div className="hero">
        <h1>Witamy w Generatorze CV</h1>
        <p>Profesjonalne CV i list motywacyjny w kilka sekund!</p>
        <button onClick={scrollToForm} className="scroll-button">Wypróbuj ↓</button>
      </div>

      {/* Sekcja informacyjna */}
      <div className="info-section">
        <div className="info-card">
          <h2>Czym jest generator CV?</h2>
          <p>To proste narzędzie, które pomoże Ci stworzyć profesjonalne CV oraz list motywacyjny w zaledwie kilka chwil.</p>
        </div>
        <div className="info-card">
          <h2>Jak działamy?</h2>
          <p>Podajesz nam kilka podstawowych informacji, a my generujemy gotowe dokumenty, które możesz od razu wykorzystać.</p>
        </div>
      </div>

      {/* Generator */}
      <div className="container" ref={formRef}>
        <h1>Generator CV i Listu Motywacyjnego</h1>
        <form onSubmit={handleSubmit}>
          <label>Imię i nazwisko:
            <input type="text" value={imie} onChange={(e) => setImie(e.target.value)} required />
          </label>
          <label>Stanowisko docelowe:
            <input type="text" value={stanowisko} onChange={(e) => setStanowisko(e.target.value)} required />
          </label>
          <label>Doświadczenie zawodowe:
            <textarea value={doswiadczenie} onChange={(e) => setDoswiadczenie(e.target.value)} required />
          </label>
          <label>Umiejętności:
            <textarea value={umiejetnosci} onChange={(e) => setUmiejetnosci(e.target.value)} required />
          </label>
          <label>Wykształcenie:
            <textarea value={edukacja} onChange={(e) => setEdukacja(e.target.value)} required />
          </label>
          <label>Dane kontaktowe:
            <input type="text" value={kontakt} onChange={(e) => setKontakt(e.target.value)} required />
          </label>
          <button type="submit" disabled={generuje}>
            {generuje ? 'Generowanie...' : 'Generuj'}
          </button>
        </form>

        <div className="result">
          {wynik}
        </div>
      </div>
    </div>
  )
}
