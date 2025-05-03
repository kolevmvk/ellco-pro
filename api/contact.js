const express = require('express');
const router = express.Router();

router.post('/contact', async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;
        
        // TODO: Implementirati logiku za slanje emaila
        
        res.json({
            success: true,
            message: 'Poruka je uspešno poslata'
        });
    } catch (error) {
        console.error('Error in contact form:', error);
        res.status(500).json({
            success: false,
            message: 'Došlo je do greške prilikom slanja poruke'
        });
    }
});

module.exports = router;
