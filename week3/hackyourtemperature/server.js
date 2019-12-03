const express = require('express');
const exphbs = require('express-handlebars');
const axios = require('axios');
const app = express();
const path = require('path');

const APIKEY = require('./sources/secrets.json').API_KEY;

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index');
});
app.post('/weather', (req, res, next) => {
    // stor the name of the city
    const cityName = req.body.cityName;
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${APIKEY}&units=metric`;
    axios.get(url).then(data => {
        //storage the weather information in variable and set the temperature to integer 

        const weather = {
            city: `City name:  ${cityName} ,${data.data.sys.country}`,
            temp: ` It is currently ${Math.round(data.data.main.temp)}  °C`,
            description: data.data.weather[0].description,
            icon: data.data.weather[0].icon,
            pressure: `Pressure ${data.data.main.pressure} hPa`,
            temp_min: `Minimum tempreature  ${Math.round(data.data.main.temp_min)}  °C`,
            temp_max: `Maximum tempreature  ${Math.round(data.data.main.temp_max)}  °C`
        }
        const weather_data = { weather }
        res.render('index', weather_data)

    }).catch(error => {
        // show the error message
        const err = error.response.data.message;
        // Error code
        const theErrorCode = error.response.data.cod;

        res.render('index', {
            err
        });
        // set the response to the exact error number
        res.statusCode = theErrorCode
    });
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...`)
});