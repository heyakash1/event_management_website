require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const eventRoutes = require('./routes/eventRoutes');

const app = express();

// connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

app.use('/api/events',eventRoutes);

app.get('/', (req, res) => {
    res.send('Server is working!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});