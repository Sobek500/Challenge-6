var APIKey = "";
var city = "";
var lat = "33";
var lon = "44";

var weatherUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=hourly,daily&appid=${APIKey}`

fetch(weatherUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log('Weather \n----------');
    for (var i = 0; i < data.length; i++) {
      console.log(data[i].temp);
      console.log(data[i].humidity);
      console.log(data[i].wind_speed);
    }
  });