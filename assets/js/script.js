const APIKey = "481b23d3763227cf6d7a789a4354554d";

function updateWeatherData(data) {
  const temperatureElement = document.getElementById("temperature");
  const humidityElement = document.getElementById("humidity");
  const windSpeedElement = document.getElementById("windSpeed");

  temperatureElement.textContent = data.main.temp.toFixed(2);
  humidityElement.textContent = data.main.humidity.toFixed(2);
  windSpeedElement.textContent = data.wind.speed.toFixed(2);
}

function fetchWeatherByCityName(cityName) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKey}`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(cityData => {
      const latitude = cityData.coord.lat;
      const longitude = cityData.coord.lon;
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

      fetch(forecastUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(weatherData => {
          updateWeatherData(weatherData.list[0]);
        })
        .catch(error => {
          console.error(`Error fetching forecast data: ${error.message}`);
        });
    })
    .catch(error => {
      console.error(`Error fetching city data: ${error.message}`);
    });
}

const searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", () => {
  const cityInput = document.getElementById("cityInput").value;
  if (cityInput) {
    fetchWeatherByCityName(cityInput);
  }
});
