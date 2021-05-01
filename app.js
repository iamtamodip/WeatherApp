const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  console.log(req.body.cityName);

  const query = req.body.cityName;
  const apiKey = "1e0eca55b2dfbb2379a1529a1410eff2";
  const unit = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    apiKey +
    "&units=" +
    unit;

  https.get(url, function (response) {
    console.log(response.statusCode);

    response.on("data", function (data) {
      // const weatherData = JSON.parse(data)
      // console.log(weatherData)

      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

      res.write(
        "<p>The weather in " + query + " is " + weatherDescription + ".<p>"
      );
      res.write(
        "<h1>The temparature in " +
          query +
          " is " +
          temp +
          " degree Celcious. </h1>"
      );
      res.write("<img src=" + imageURL + ">");
      res.send();
    });
  });

  //Response.send("<h1>Server is up and running</h1>")
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Server running on port 3000");
});
