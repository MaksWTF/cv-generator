'use client'

import { useState, FormEvent } from 'react'
import { text } from 'stream/consumers'

export default function Home() {
  const [imie, setImie] = useState('')
  const [stanowisko, setStanowisko] = useState('')
  const [doswiadczenie, setDoswiadczenie] = useState('')
  const [umiejetnosci, setUmiejetnosci] = useState('')
  const [edukacja, setEdukacja] = useState('')
  const [kontakt, setKontakt] = useState('')
  const [wynik, setWynik] = useState('Brak odpowiedzi')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imie, stanowisko, doswiadczenie, umiejetnosci, edukacja, kontakt }),
      })

      const data = await response.json()
      setWynik(data.wynik)
    } catch (error) {
      console.error('Błąd:', error)
      setWynik('Wystąpił błąd podczas generowania.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <h1>Generator CV i Listu Motywacyjnego</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Imię i nazwisko:
          <input type="text" value={imie} onChange={(e) => setImie(e.target.value)} required />
        </label>

        <label>
          Stanowisko docelowe:
          <input type="text" value={stanowisko} onChange={(e) => setStanowisko(e.target.value)} required />
        </label>

        <label>
          Doświadczenie zawodowe:
          <textarea value={doswiadczenie} onChange={(e) => setDoswiadczenie(e.target.value)} required />
        </label>

        <label>
          Umiejętności:
          <textarea value={umiejetnosci} onChange={(e) => setUmiejetnosci(e.target.value)} required />
        </label>

        <label>
          Wykształcenie:
          <textarea value={edukacja} onChange={(e) => setEdukacja(e.target.value)} required />
        </label>

        <label>
          Dane kontaktowe:
          <input type="text" value={kontakt} onChange={(e) => setKontakt(e.target.value)} required />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? 'Generuję...' : 'Generuj'}
        </button>
      </form>

      <div className="result">
        <h2>Wynik:</h2>
        <p>{wynik}</p>
      </div>
    </div>
  )
}
