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
    kontakt: '',
  })
  const [loading, setLoading] = useState(false)
  const [wynik, setWynik] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()
      setWynik(data.wynik)
    } catch {
      setWynik('Wystąpił błąd przy generowaniu.')
    }    

    setLoading(false)
  }

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <section className="intro-section">
        <div className="intro-content">
          <h1>Witaj w Generatorze CV</h1>
          <p>
            Narzędzie do tworzenia profesjonalnego CV i listu motywacyjnego w kilka sekund!
          </p>
          <button className="scroll-button" onClick={scrollToForm}>
            ↓ Wypróbuj
          </button>
        </div>
      </section>

      <section className="info-section">
        <div className="info-box">
          <h2>Czym jest &quot;Generator CV&quot;?</h2>
          <p>
            To aplikacja, która pozwala Ci wprowadzić swoje dane, a my zajmiemy się resztą.
            Dzięki AI otrzymasz gotowe, profesjonalne CV i list motywacyjny w formalnym stylu.
          </p>
        </div>
        <div className="info-box">
          <h2>Jak działamy?</h2>
          <p>
            Wystarczy, że wpiszesz swoje dane w formularzu poniżej, klikniesz &quot;Generuj&quot;,
            a po chwili za pomocą AI zobaczysz komplet dokumentów gotowych do wykorzystania.
          </p>
        </div>
      </section>

      <div className="container" ref={formRef}>
        <h2>Generator CV i Listu Motywacyjnego</h2>
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
          <button type="submit" disabled={loading}>
            {loading ? 'Generuję...' : 'Generuj'}
          </button>
        </form>

        {wynik && (
          <div className="result">
            <h3>Wynik:</h3>
            <pre>{wynik}</pre>
          </div>
        )}
      </div>
    </>
  )
}
