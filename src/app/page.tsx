'use client'

import { useState } from 'react'

export default function Home() {
  const [imie, setImie] = useState('')
  const [stanowisko, setStanowisko] = useState('')
  const [doswiadczenie, setDoswiadczenie] = useState('')
  const [umiejetnosci, setUmiejetnosci] = useState('')
  const [edukacja, setEdukacja] = useState('')
  const [kontakt, setKontakt] = useState('')
  const [wynik, setWynik] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => { 
    e.preventDefault()
    setLoading(true)
    setWynik('')

    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imie, stanowisko, doswiadczenie, umiejetnosci, edukacja, kontakt }),
    })

    const data = await response.json()
    setWynik(data.wynik)
    setLoading(false)
  }

  return (
    <main className="min-h-screen p-8 bg-gray-900 text-white flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-white">Generator CV i Listu Motywacyjnego</h1>

      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-gray-800 p-6 rounded-xl shadow-md mb-6 space-y-4">
        <div>
          <label className="block mb-2 text-gray-200">Imię i nazwisko:</label>
          <input type="text" className="w-full p-2 border border-gray-700 rounded bg-gray-700 text-white" value={imie} onChange={(e) => setImie(e.target.value)} required />
        </div>

        <div>
          <label className="block mb-2 text-gray-200">Stanowisko docelowe:</label>
          <input type="text" className="w-full p-2 border border-gray-700 rounded bg-gray-700 text-white" value={stanowisko} onChange={(e) => setStanowisko(e.target.value)} required />
        </div>

        <div>
          <label className="block mb-2 text-gray-200">Doświadczenie zawodowe:</label>
          <textarea className="w-full p-2 border border-gray-700 rounded bg-gray-700 text-white" value={doswiadczenie} onChange={(e) => setDoswiadczenie(e.target.value)} required />
        </div>

        <div>
          <label className="block mb-2 text-gray-200">Umiejętności:</label>
          <textarea className="w-full p-2 border border-gray-700 rounded bg-gray-700 text-white" value={umiejetnosci} onChange={(e) => setUmiejetnosci(e.target.value)} required />
        </div>

        <div>
          <label className="block mb-2 text-gray-200">Wykształcenie:</label>
          <textarea className="w-full p-2 border border-gray-700 rounded bg-gray-700 text-white" value={edukacja} onChange={(e) => setEdukacja(e.target.value)} required />
        </div>

        <div>
          <label className="block mb-2 text-gray-200">Dane kontaktowe (telefon, e-mail):</label>
          <input type="text" className="w-full p-2 border border-gray-700 rounded bg-gray-700 text-white" value={kontakt} onChange={(e) => setKontakt(e.target.value)} required />
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
          {loading ? 'Generuję...' : 'Generuj'}
        </button>
      </form>

      {wynik && (
        <div className="w-full max-w-3xl bg-gray-800 p-6 rounded-xl shadow-md text-white">
          <pre className="whitespace-pre-wrap">{wynik}</pre>
        </div>
      )}
    </main>
  )
}
