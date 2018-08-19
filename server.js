const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');

let apiKey = '51f567d83bba02938b537712f800195a';

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.render('index', {weather: null, error: null});
});

app.post('/', (req, res) => {
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    request(url, (err, response,body) => {
        if(err) {
            res.render('index', {weather: null, error: 'Error, Please Try Again'})
        } else {
            let weather = JSON.parse(body);
            if(weather.main === undefined) {
                res.render('index', {weather: null, 
                error: 'City Not Found! Please Type with a correct city name '});
            } else {
                let weatherText = `It's ${weather.main.temp} degress in ${weather.name}`;
                res.render('index', {weather: weatherText, error: null});
            }
        }
       

    })
})

app.listen(3000, () => {
    console.log('App Listening on port 3000');
});