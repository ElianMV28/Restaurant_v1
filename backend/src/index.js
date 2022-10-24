const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()
const foodRoutes = require('./routes/foods');
const cors = require('cors');

const app = express();


const port = 3000;

//middleware
app.use(cors())
app.use(express.json());
app.use('/api', foodRoutes);


// routes
app.get('/', (req,res) => {
    res.send('welcome');
})
//mongobd conection

mongoose.connect(process.env.MONGODB_URI)
    .then(()=> console.log('Connected to Mongodb Atlas'))
    .catch((error) => console.error(error));
app.listen(port,() => console.log('server listening on port', port));