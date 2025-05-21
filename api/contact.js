import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { name, email, phone, message } = req.body;

  try {
    await resend.emails.send({
      from: 'Ellco Kontakt <office@ellco.pro>',
      to: 'office@ellco.pro',
      subject: '📩 Nova poruka sa sajta',
      html: `
        <p><strong>Ime:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telefon:</strong> ${phone}</p>
        <p><strong>Poruka:</strong><br>${message}</p>
      `
    });

    res.status(200).json({ success: true, message: 'Poruka je poslata!' });
  } catch (error) {
    console.error('Greška pri slanju mejla:', error);
    res.status(500).json({ success: false, message: 'Slanje nije uspelo' });
  }
}
