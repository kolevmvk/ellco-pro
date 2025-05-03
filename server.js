const express = require('express');
const cors = require('cors');
const contactRouter = require('./api/contact');
const bookingRouter = require('./api/booking');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Routes
app.use('/api', contactRouter);
app.use('/api', bookingRouter);

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Došlo je do greške na serveru'
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server je pokrenut na portu ${port}`);
}); 