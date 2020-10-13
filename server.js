const express = require("express");
const mongoose = require('mongoose');

const DATABASE_URL = process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/notes';
mongoose.connect(DATABASE_URL, 
        { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to DB'));

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.use(express.json());

require('./app/routes/index.js')(app, db)




app.listen(PORT);