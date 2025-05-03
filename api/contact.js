export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ success: false, message: 'Method not allowed' });
    }
  
    try {
      const { name, email, phone, message } = req.body;
  
      // TODO: Ovde ubaciš nodemailer ili logiku slanja
  
      res.status(200).json({
        success: true,
        message: 'Poruka je uspešno poslata'
      });
    } catch (error) {
      console.error('Greška u slanju forme:', error);
      res.status(500).json({
        success: false,
        message: 'Došlo je do greške prilikom slanja poruke'
      });
    }
  }
  