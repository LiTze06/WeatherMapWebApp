var request;
var gettingData = false;
var openWeatherMapKey = "6f6f42e65257899f09e1b2bc542f148b";
var submitButton = document.getElementById("submitButton");
var cityInput = document.getElementById("cityInput");
var displayResult = document.getElementById("displayResult");
submitButton.addEventListener("click", function () {
    ;
    getWeather();
});
cityInput.addEventListener('keyup', function (event) {
    event.preventDefault();
    if (event.keyCode == 13) {
        // 13 is ENTER
        cityInput.click();
        getWeather();
    }
});
function getWeather() {
    var city = cityInput.value;
    var requestString = "http://api.openweathermap.org/data/2.5/weather?q="
        + city + "&units=metric&format=json&APPID=" + openWeatherMapKey;
    request = new XMLHttpRequest();
    request.open("GET", requestString, true);
    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200)
            var temperatureInfo = JSON.parse(request.responseText);
        processResults(temperatureInfo);
    };
    request.send();
}
;
var weatherInformation = (function () {
    function weatherInformation(city, temperature, description, humidity, windSpeed, icon) {
        this.city = city;
        this.temperature = temperature;
        this.description = description;
        this.humidity = humidity;
        this.windSpeed = windSpeed;
        this.iconURL = "http://openweathermap.org/img/w/" + icon + ".png";
    }
    return weatherInformation;
}());
var processResults = function (temperatureInfo) {
    console.log(this);
    var data = new weatherInformation(temperatureInfo.name, temperatureInfo.main.temp, temperatureInfo.weather[0].main, temperatureInfo.main.humidity, temperatureInfo.wind.speed, temperatureInfo.weather[0].icon);
    var weathericon = document.getElementById("weatherIcon");
    weathericon.innerHTML = "<img id='weatherImg' class='img-responsive' alt='Weather Icon' src='"
        + data.iconURL + "'>";
    var cityName = document.getElementById("city");
    cityName.innerHTML = "<h3 id='cityName'>" + data.city + "</h3>";
    var temperature = document.getElementById("temperature");
    temperature.innerHTML = "<h3 id='temperatureInDegree'>" + data.temperature + "&#8451;</h3>";
    var tableContent = "<table id='resultTable'>";
    tableContent += "<tr><td>Description:</td><td>" + data.description + "</td><tr>";
    tableContent += "<tr><td>Humidity:</td><td>" + data.humidity + "%</td><tr>";
    tableContent += "<tr><td>Wind Speed:</td><td>" + data.windSpeed + "mps</td><tr>";
    tableContent += "</table>";
    displayResult.innerHTML = tableContent;
};
