function displayTemperature(response) {
    //console.log(response.data.temperature.current)
    let temperature = response.data.temperature.current;
    let temperatureElement = document.querySelector("#temperature");
   let cityElement = document.querySelector("#city");
   let descriptionElement = document.querySelector("#description")
   let humidityElement = document.querySelector("#humidity");
   let windSpeedElement = document.querySelector("#wind-speed")
   let timeElement = document.querySelector("#time");
   let date = new Date(response.data.time * 1000)
   let iconElement = document.querySelector("#icon")
   
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon">`

   //console.log(response.data.condition.description)
    descriptionElement.innerHTML=response.data.condition.description;
   cityElement.innerHTML = response.data.city;
    //cityElement.innerHTML = searchInput.value;
    timeElement.innerHTML = formatDate(date);
    temperatureElement.innerHTML = Math.round(temperature);
    humidityElement.innerHTML= `${response.data.temperature.humidity}%`;
    windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`

    getForecast(response.data.city);
  }

  function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      let day = days[date.getDay()];
      if (minutes < 10) {
        minutes = `0${minutes}`;
      }
      if (hours < 10) {
       hours = `0${hours}`;
        }
      return `${day} ${hours}:${minutes}`

      let formattedDay = days[day];
      return `${formattedDay} ${hours}:${minutes}`;
    
    //let day = date.getDay();
  
    }

  
function handleSearchSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
    console.log(searchInput.value)
    
    searchCity(searchInput.value)
}
function getForecast(city){
    let apiKey = "13d2ee51f9b4o75695t30ad14de90637";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`
//console.log(apiUrl);
axios.get(apiUrl).then(displayForecast);
}
function displayForecast (response){
    console.log(response.data);
    let forecastElement = document.querySelector("#forecast")
 
    let days = [`Tue`, `Wed`, `Thu`, `Fri`, `Sat`]
    let forecastHtml = "";

    days.forEach(function(day) {
        forecastHtml =
        forecastHtml  + `

<div class="weather-forecast-day">
<div class="weather-forecast-date">
    ${day}
</div>

 <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAAVVJREFUaN7tmckNgzAQRV1CSqAEl+ASKIFjjpTgEiiBElICJeTKjXRAB5MZyUgOyoKNx8hkLL1LNv6D8RoFAKpklAiIgAiIgAiIwMsLGxs8rjXSI3cE3nB379cqYdstgIEsMn8I/Qn6vD1UAAMYZAoMvoa+r7ML4EWbncHXNNkEGMLvkggSYAy/ULMJ4I9XEZ0VIjp3xSVwYw6/cEsu4EYcyIhOLdBnFuhTC3DXPs3SgzeLD3TdcRw1Yj10sABz+VBgsxrpLgSG7RB4Qxcq0DKGp6AtMnsBB3e34QttiIBlEjAuPEQwhQh0HHff1fgcKQBHCtCA0GCIKja8/yToKeYsoaXuzYY6D6HL1YlpWGwSBvfR3MPo7rr/geWeyHonYJkw3EsJqxjafyzmil9On2JDU/yW8hSb+lMcq5ziYCvB0eJ0+NFiMYe78v+ACIiACIiACJTEEyDCTi8sMWUSAAAAAElFTkSuQmCC" alt="" width="46">
<br class="weather-forecast-temperature">
<span class="weather-forecast-temperature-max">
18°
</span>

<span class="weather-forecast-temperature-min">
20°
</span>
</div>

</div>

`;

    });
forecastElement.innerHTML = forecastHtml;

}
function searchCity(city) {
    //event.preventDefault();
    //let searchInputElement = document.querySelector("#search-input");
    //let cityElement = document.querySelector("#current-city");
    //let city = searchInputElement.value;
  
    let apiKey = "13d2ee51f9b4o75695t30ad14de90637";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  
    //cityElement.innerHTML = searchInputElement.value;
    axios.get(apiUrl).then(displayTemperature);
    //cityElement.innerHTML = city;
  }

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);
searchCity("Carletonville");

displayForecast();