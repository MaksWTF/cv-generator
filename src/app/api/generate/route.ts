import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    console.log('[API] Odebrano request do /api/generate')

    const body = await req.json()
    console.log('[API] Dane z frontendu:', body)

    const { imie, stanowisko, doswiadczenie, umiejetnosci, edukacja, kontakt } = body

    const prompt = `
Napisz profesjonalne CV oraz list motywacyjny na podstawie następujących informacji, które zostaną podane przez użytkownika. Rozwiń to CV tak do 2 zdań nie licząc podanych informacji. nie dodawaj informacji spoza podanych.

Imię i nazwisko: ${imie}
Stanowisko docelowe: ${stanowisko}
Doświadczenie zawodowe: ${doswiadczenie}
Umiejętności: ${umiejetnosci}
Wykształcenie: ${edukacja}
Dane kontaktowe: ${kontakt}

CV i list mają być w języku polskim, styl formalny, dostosowany do pracy biurowej. Nie używaj zbyt ogólnikowych zwrotów. List motywacyjny niech będzie krótki, konkretny i przyjazny. Wynik podaj w czytelnej, sformatowanej formie
`

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'openai/gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
      }),
    })

    const data = await response.json()
    console.log('[API] Odpowiedź OpenRouter:', data)

    const wynik = data.choices[0].message?.content || 'Brak odpowiedzi'

    return NextResponse.json({ wynik })
  } catch (error) {
    console.error('[API] Błąd w API:', error)
    return NextResponse.json({ error: 'Coś poszło nie tak.' }, { status: 500 })
  }
}
