const cookieParser = require('cookie-parser');
const express = require('express');
const authRoutes = require('./routes/auth.routes');
const fooditemRoutes = require('./routes/fooditem.routes');
const foodpartnerRoutes = require('./routes/foodpartner.routes');
const cors=require('cors');

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/fooditems', fooditemRoutes);
app.use('/api/foodpartner', foodpartnerRoutes);

app.get('/', (req, res) => {
    res.send('Kaise ho sab log!');
});

module.exports = app;