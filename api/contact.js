import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { name, email, phone, message } = req.body;

  const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.eu',
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  });

  try {
    await transporter.sendMail({
      from: `"Ellco Kontakt" <${process.env.MAIL_USER}>`,
      to: 'office@ellco.pro', // <-- tvoja meta adresa
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
