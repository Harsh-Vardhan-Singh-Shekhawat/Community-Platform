const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

const authRoutes = require('./routes/auth');
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.get((req,res) => {
    res.send('Jai Shree Ram');
})
app.use('/routes', authRoutes);

app.listen(PORT, () =>{
    console.log(`server listening on port ${PORT}`)
} )