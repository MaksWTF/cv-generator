'use client'

import { useRef, useState } from 'react'

export default function Home() {
  const formRef = useRef<HTMLDivElement>(null)
  const [formData, setFormData] = useState({
    imie: '',
    stanowisko: '',
    doswiadczenie: '',
    umiejetnosci: '',
    edukacja: '',
    kontakt: ''
  })
  const [result, setResult] = useState('')

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()
      setResult(data.wynik || 'Brak odpowiedzi')
    } catch {
      setResult('Wystąpił błąd podczas generowania.')
    }
  }

  return (
    <>
      {/* Sekcja powitalna */}
      <div className="hero">
        <h1>Witamy w Generatorze CV!</h1>

        <div className="hero-cards">
          <div className="info-card">
            <h2>Czym jest generator CV?</h2>
            <p>To narzędzie, które automatycznie stworzy profesjonalne CV oraz list motywacyjny na podstawie podanych przez Ciebie danych. Szybko, wygodnie i bez stresu!</p>
          </div>
          <div className="info-card">
            <h2>Jak działamy?</h2>
            <p>Wystarczy, że uzupełnisz formularz, a nasz system wygeneruje gotowe dokumenty w kilka sekund. Im więcej informacji wpiszesz w formularzu, tym lepszy uzyskasz wynik!</p>
          </div>
        </div>

        <button className="scroll-button" onClick={scrollToForm}>Wypróbuj</button>
      </div>

      {/* Formularz */}
      <div className="container" ref={formRef}>
        <h1>Generator CV i Listu Motywacyjnego</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Imię i nazwisko:
            <input type="text" name="imie" value={formData.imie} onChange={handleChange} required />
          </label>
          <label>
            Stanowisko docelowe:
            <input type="text" name="stanowisko" value={formData.stanowisko} onChange={handleChange} required />
          </label>
          <label>
            Doświadczenie zawodowe:
            <textarea name="doswiadczenie" value={formData.doswiadczenie} onChange={handleChange} required />
          </label>
          <label>
            Umiejętności:
            <textarea name="umiejetnosci" value={formData.umiejetnosci} onChange={handleChange} required />
          </label>
          <label>
            Wykształcenie:
            <textarea name="edukacja" value={formData.edukacja} onChange={handleChange} required />
          </label>
          <label>
            Dane kontaktowe:
            <input type="text" name="kontakt" value={formData.kontakt} onChange={handleChange} required />
          </label>
          <button type="submit">Generuj</button>
        </form>

        <div className="result">
          {result}
        </div>
      </div>
    </>
  )
}
