const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://www.ellco.pro');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // ✅ OVDE prvo izvlačiš podatke
  const { name, email, phone, message, website, token } = req.body;

  // ✅ Onda radiš zaštitu
  if (website && website.trim() !== '') {
    return res.status(400).json({ message: 'Sumnjiv zahtev (honeypot).' });
  }

  if (!token || typeof token !== 'string' || token.length < 10) {
    return res.status(400).json({ message: 'Nevažeći zahtev (token).' });
  }

  try {
    await resend.emails.send({
      from: 'office@ellco.pro',
      to: 'office@ellco.pro',
      subject: `Nova poruka sa sajta od ${name}`,
      html: `
        <p><strong>Ime:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telefon:</strong> ${phone}</p>
        <p><strong>Poruka:</strong><br>${message}</p>
      `,
    });

    return res.status(200).json({ message: 'Poruka uspešno poslata.' });
  } catch (error) {
    console.error('Greška pri slanju:', error);
    return res.status(500).json({ message: 'Došlo je do greške pri slanju.' });
  }
};
