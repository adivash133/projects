function getWeather() {
  const apiKey = "29c32648ad49fba889740f15a99cf195";
  const city = document.getElementById("city").value;

  if (!city) {
    alert("Please enter a city name");
    return;
  }
  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

  fetch(currentWeatherUrl)
    .then((response) => response.json())
    .then((data) => {
      displayWeather(data);
    })
    .catch((error) => {
      console.error("Error fetching current weather:", error);
      alert("Error fetching current weather data. Please try again.");
    });

  fetch(forecastUrl)
    .then((response) => response.json())
    .then((data) => {
      displayHourlyForecast(data.list);
    })
    .catch((error) => {
      console.error("Error fetching hourly forecast data:", error);
      alert("Error fetching hourly forecast data. Please try again.");
    });
}
function displayWeather(data) {
  const tempDivInfo = document.getElementById("temp-div");
  const weatherInfoDiv = document.getElementById("weather-info");
  const weatherIcon = document.getElementById("weather-icon");

  if (data.cod === "404") {
    weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
  } else {
    const cityName = data.name;
    const description = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

    const temperatureHTML = `<p>${cityName}</p>
        <p>${description}</p>`;

    const weatherHtml = `<p>Temperature: ${Math.round(
      data.main.temp - 273.15
    )} °C</p>`;

    // Clear previous content
    tempDivInfo.innerHTML = temperatureHTML;
    weatherInfoDiv.innerHTML = weatherHtml;
    weatherIcon.src = iconUrl;
    weatherIcon.alt = description;

    showImage();
  }
}

function displayHourlyForecast(hourlyData) {
  const hourlyForecastDiv = document.getElementById("hourly-forecast");
  hourlyForecastDiv.innerHTML = "";
  const next24Hours = hourlyData.slice(0, 8);

  next24Hours.forEach((item) => {
    const dataTime = new Date(item.dt * 1000);
    const hour = dataTime.getHours();
    const temperature = Math.round(item.main.temp - 273.15);
    const iconCode = item.weather[0].icon;
    const hourlyItemHtml = `<div class="hourly-item">
   <span>${hour}:00</span>
    <img src="http://openweathermap.org/img/wn/${iconCode}@2x.png" alt="Hourly Weather Icon">
    <span>${temperature}°C</span>
    </div>`;
    hourlyForecastDiv.innerHTML += hourlyItemHtml;
  });
}

function showImage() {
  const weatherIcon = document.getElementById("weather-icon");
  weatherIcon.style.display = "block";
}
