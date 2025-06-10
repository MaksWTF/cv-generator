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
  const [loading, setLoading] = useState(false)

  const handleScroll = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imie, stanowisko, doswiadczenie, umiejetnosci, edukacja, kontakt })
    })

    const data = await response.json()
    setWynik(data.wynik || 'Brak odpowiedzi')
    setLoading(false)
  }

  return (
    <>
      {/* Sekcja powitalna */}
      <section className="intro-section">
        <h1>Witaj na stronie generatora CV!</h1>
        <p>
          Dzięki naszemu generatorowi stworzysz profesjonalne CV oraz list motywacyjny w kilka sekund.
          Wystarczy uzupełnić podstawowe dane, a my zajmiemy się resztą.
        </p>

        <div className="info-box">
          <h2>Czym jest generator CV?</h2>
          <p>
            Generator CV to inteligentne narzędzie, które automatycznie tworzy CV oraz list motywacyjny na podstawie podanych przez Ciebie informacji. 
            Dzięki niemu oszczędzasz czas i tworzysz dokumenty gotowe do wysłania pracodawcy.
          </p>
        </div>

        <div className="info-box">
          <h2>Jak działamy?</h2>
          <p>
            Wpisz swoje dane w formularzu poniżej, klikasz "Generuj", a my za pomocą AI w kilka sekund przygotowujemy dla Ciebie profesjonalne dokumenty aplikacyjne. 
            Wszystko w przyjaznym, formalnym stylu i bez zbędnych ogólników.
          </p>
        </div>

        <button className="scroll-button" onClick={handleScroll}>Wypróbuj ⬇️</button>
      </section>

      {/* Sekcja formularza */}
      <div className="container" ref={formRef}>
        <h1>Generator CV i Listu Motywacyjnego</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Imię i nazwisko:
            <input type="text" value={imie} onChange={e => setImie(e.target.value)} required />
          </label>
          <label>
            Stanowisko docelowe:
            <input type="text" value={stanowisko} onChange={e => setStanowisko(e.target.value)} required />
          </label>
          <label>
            Doświadczenie zawodowe:
            <textarea value={doswiadczenie} onChange={e => setDoswiadczenie(e.target.value)} required />
          </label>
          <label>
            Umiejętności:
            <textarea value={umiejetnosci} onChange={e => setUmiejetnosci(e.target.value)} required />
          </label>
          <label>
            Wykształcenie:
            <textarea value={edukacja} onChange={e => setEdukacja(e.target.value)} required />
          </label>
          <label>
            Dane kontaktowe:
            <input type="text" value={kontakt} onChange={e => setKontakt(e.target.value)} required />
          </label>
          <button type="submit">{loading ? 'Generowanie...' : 'Generuj'}</button>
        </form>

        <div className="result">{wynik}</div>
      </div>
    </>
  )
}
