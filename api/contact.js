const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = async (req, res) => {
  // ✅ CORS zaglavlja
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // ✅ Preflight OPTIONS zahtev (browser šalje automatski pre POST-a)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // ✅ Dozvoljen samo POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, email, phone, message } = req.body;

  try {
    const data = await resend.emails.send({
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
