const express = require('express');
const exphbs = require('express-handlebars');
const axios = require('axios');
const app = express();
app.get('/', (req, res) => {
    res.send('hello from backend to frontend!')
});
const PORT = process.env.PORT || 3000;

app.listen(3000, () => {
    console.log(`listen to port ${PORT}...`)
});