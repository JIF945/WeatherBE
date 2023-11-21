// search section
var cityInput = document.getElementById("search");
var searchBtn = document.querySelector("#btn");
var searchHistory = $("search-history-list");

// forecast section
var searchInfo = document.querySelector(".searchInfo");
var weatherIcon = document.querySelector(".weatherIcon");
var temp = document.querySelector(".temp");
var humidity = document.querySelector(".humidity");
var wind = document.querySelector(".wind");

// future forecast
var forecast = document.querySelectorAll(".forecast");

searchBtn.addEventListener("click", function () {
  var cityName = cityInput.value;
  fetchWeather(cityName);
});

// calling weather Api and pull weather data
function fetchWeather(cityName) {
  fetch(
    'https://api.openweathermap.org/data/2.5/forecast?q=' +
      cityName +
      '&appid=619b0e919a3f3d20cd2880d09b4d0a00&units=imperial'
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // pulling the data
      var currrentDate = new Date(data.list[0].dt * 1000);
      var month = currrentDate.getMonth() + 1;
      var day = currrentDate.getDate();
      var year = currrentDate.getFullYear();
      searchInfo.innerHTML =
        data.city.name + "-" + "(" + month + "/" + day + "/" + year + ")";
      weatherIcon.setAttribute(
        "src",
        "https://openweathermap.org/img/wn/" +
          data.list[0].weather[0].icon +
          "@4x.png"
      );
      weatherIcon.setAttribute("alt", data.list[0].weather[0].description);
      temp.innerHTML =
        "Temperature: " + Math.floor(data.list[0].main.temp) + "&#176F";
      humidity.innerHTML =
        "Humidity:" + Math.floor(data.list[0].main.humidity) + "&";
      wind.innerHTML = "Wind:" + Math.floor(data.list[0].wind.speed) + "Mph";
      for (var i = 0; i < forecast.length; i++) {
        forecast[i].innerHTML = "";
        var dayIndex = i * 8 + 4;
        var dayDate = new Date(data.list[dayIndex].dt * 1000);
        var forecastMonth = dayDate.getMonth() + 1;
        var forecastDay = dayDate.getDate();
        var forecastYear = dayDate.getFullYear();

        var forecastDate = document.createElement("b");
        var forecastImg = document.createElement("img");
        var forecastTemp = document.createElement("p");
        var forecastHumidity = document.createElement("p");
        var forecastWind = document.createElement("p");

        forecastDate.innerHTML =
          "(" + forecastMonth + "/" + forecastDay + "/" + forecastYear + ")";
        forecastImg.setAttribute(
          "src",
            "https://openweathermap.org/img/wn/" +
            data.list[dayIndex].weather[0].icon +
            "@2x.png"
        );
        forecastImg.setAttribute("alt", data.list[0].weather[0].description);
        forecastTemp.innerHTML =
          "Temperature: " +
          Math.floor(data.list[0].main.temp) +
          "&#176F";
        forecastHumidity.innerHTML =
          "Humidity:" + Math.floor(data.list[0].main.humidity) + "&";
        forecastWind.innerHTML =
          "Wind:" + Math.floor(data.list[0].wind.speed) + "Mph";

        forecast[i].append(forecastDate);
        forecast[i].append(forecastImg);
        forecast[i].append(forecastTemp);
        forecast[i].append(forecastHumidity);
        forecast[i].append(forecastWind);
      }
    });
}
