const express = require("express");
const https = require("https");
const bodyParser =require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");

app.post("/",function(req,res){


od

  const city=req.body.cityName;
  const apiKey ="43847696393764f483cfdaa6d6a16593"
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=metric&appid="+apiKey;
  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp
      const des = weatherData.weather[0].description
      const feelsLike = weatherData.main.feels_like
      const icon = weatherData.weather[0].icon
      const imageURL ="https://openweathermap.org/img/wn/"+icon+"@2x.png"


      res.write("<h1>The temperature of "+city+" is " + temp + " degree  Celcius.</h1>");
      res.write("<h2>The Feels like weather is " + feelsLike + "</h2>");
      res.write("<p>The Weather is currently " + des + "</p>");
      res.write("<img src="+imageURL+">");
      res.send();
    })
  })
})
})



app.listen(3000, function() {
  console.log("Server is running on port 3000");
})
