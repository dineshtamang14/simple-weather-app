const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
    const city = req.body.cityName;
    const apiKey = "a3468046d621b07fa3593b20ef9c6a8e"
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey +"&units=" + unit;
    
    https.get(url, function(response){
        console.log(response.statusCode);
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp
            const weatherDescription = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"

            // console.log(icon);
            // console.log(temp);
            // console.log(weatherDescription);

            res.write("<h1>The weather is currently " + weatherDescription + "<\h1>");
            res.write("<h1>The Temperature in "+ city +" is " + temp + " degrees Celceius </h1>");
            res.write("<img src=" + imageURL+ ">");
            res.send();
        })
    });
});

app.listen(3000, function(){
    console.log("server is running on port 3000");
});