module.exports = async (req, res) => {
  // ✅ CORS headeri
  const allowedOrigins = ['https://www.ellco.pro', 'https://api.ellco.pro'];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // ✅ Obrada preflight zahteva
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { ime, telefon, poruka } = req.body;

  if (!ime || !telefon || !poruka) {
    return res.status(400).json({ error: 'Nedostaju polja' });
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  const message = `
📨 Nova poruka sa sajta:

👤 Ime: ${ime}
📞 Telefon: ${telefon}
📝 Poruka:
${poruka}
`;

  try {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML'
      })
    });

    if (!response.ok) {
      throw new Error('Greška prilikom slanja poruke na Telegram');
    }

    res.status(200).json({ success: true });
  } catch (err) {
    console.error('❌ Telegram API greška:', err);
    res.status(500).json({ error: 'Greška na serveru' });
  }
};
