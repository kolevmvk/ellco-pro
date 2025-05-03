const express = require('express');
const router = express.Router();

router.post('/booking', async (req, res) => {
    try {
        const { name, email, phone, date, time, service, message } = req.body;
        
        // TODO: Implementirati logiku za zakazivanje sastanka
        
        res.json({
            success: true,
            message: 'Sastanak je uspešno zakazan'
        });
    } catch (error) {
        console.error('Error in booking form:', error);
        res.status(500).json({
            success: false,
            message: 'Došlo je do greške prilikom zakazivanja sastanka'
        });
    }
});

module.exports = router;
