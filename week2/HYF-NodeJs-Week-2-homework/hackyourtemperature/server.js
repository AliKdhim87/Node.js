const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const axios = require('axios');
const app = express();

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index');
});
app.post('/weather', (req, res) => {
    res.send(req.body.cityName)

});
const PORT = process.env.PORT || 3000;

app.listen(3000, () => {
    console.log(`listen to port ${PORT}...`)
});