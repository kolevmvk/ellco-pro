export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const userData = req.body;

  const prompt = `Na osnovu sledećih korisničkih odgovora: ${JSON.stringify(userData, null, 2)}
predloži idealan web paket iz ponude ellco.pro.`;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "mistralai/mistral-7b-instruct",
        messages: [
          {
            role: "system",
            content: "Ti si AI asistent koji korisnicima predlaže odgovarajući web paket na osnovu njihovih potreba."
          },
          {
            role: "user",
            content: prompt
          }
        ]
      })
    });

    const data = await response.json();
    const reply = data?.choices?.[0]?.message?.content || 'Nema AI odgovora.';
    res.status(200).json({ reply });

  } catch (error) {
    console.error('AI error:', error);
    res.status(500).json({ error: 'Greška pri obradi AI odgovora.' });
  }
}
