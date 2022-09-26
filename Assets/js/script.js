// Assigning elements of the page to variables
var searchInput = document.querySelector('#search-input');
var searchBtn = document.querySelector('#search-btn');
var resultsArea = document.querySelector('#results-area');
var searchHistory = document.querySelector('#search-history');

// Defining variables for the current day and the next 5 days in the forecast
var cityAndDate = document.querySelector('#city-and-date');
var day1 = document.querySelector('#date-1');
var day2 = document.querySelector('#date-2');
var day3 = document.querySelector('#date-3');
var day4 = document.querySelector('#date-4');
var day5 = document.querySelector('#date-5');

// Assigning the text content of each date in the 5-day forecast
day1.textContent = moment().add(1, 'days').format('MM/DD/YYYY');
day2.textContent = moment().add(2, 'days').format('MM/DD/YYYY');
day3.textContent = moment().add(3, 'days').format('MM/DD/YYYY');
day4.textContent = moment().add(4, 'days').format('MM/DD/YYYY');
day5.textContent = moment().add(5, 'days').format('MM/DD/YYYY');

// Assigning elements for the current day's weather to variables
var tempCurrent = document.querySelector('#temp');
var windCurrent = document.querySelector('#wind');
var humidityCurrent = document.querySelector('#humidity');
var iconCurrent = document.querySelector('#icon-current');

// Assigning elements for the first day in the 5-day forecast to variables
var tempDay1 = document.querySelector('#temp-1');
var windDay1 = document.querySelector('#wind-1');
var humidityDay1 = document.querySelector('#humidity-1');
var iconDay1 = document.querySelector('#icon-1');

// Assigning elements for the second day in the 5-day forecast to variables
var tempDay2 = document.querySelector('#temp-2');
var windDay2 = document.querySelector('#wind-2');
var humidityDay2 = document.querySelector('#humidity-2');
var iconDay2 = document.querySelector('#icon-2');

// Assigning elements for the third day in the 5-day forecast to variables
var tempDay3 = document.querySelector('#temp-3');
var windDay3 = document.querySelector('#wind-3');
var humidityDay3 = document.querySelector('#humidity-3');
var iconDay3 = document.querySelector('#icon-3');

// Assigning elements for the fourth day in the 5-day forecast to variables
var tempDay4 = document.querySelector('#temp-4');
var windDay4 = document.querySelector('#wind-4');
var humidityDay4 = document.querySelector('#humidity-4');
var iconDay4 = document.querySelector('#icon-4');

// Assigning elements for the fifth day in the 5-day forecast to variables
var tempDay5 = document.querySelector('#temp-5');
var windDay5 = document.querySelector('#wind-5');
var humidityDay5 = document.querySelector('#humidity-5');
var iconDay5 = document.querySelector('#icon-5');

// Checking for the data-state of the results-area to determine whether to display this section or not
function displayCheck () {
    if (resultsArea.dataset.state === 'hidden') {
        resultsArea.style.display = 'none';
    } else {
        resultsArea.style.display = 'block';
    
    }
}

// API stuff
var APIKey = 'd3f83777345084da2e7a110bbd7deea0';
var city = 'seattle'; // Replace Seattle here with whatever value is inputted
var todaysWeatherURL = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=' + APIKey;
var coordinatesURL = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=1&appid=' + APIKey;


function callAPI () {
    fetch(todaysWeatherURL)
        .then(function (response) {
            if (!response.ok) {
                alert('Please enter a valid city name');
                return;
            }
            return response.json();
        })
        .then(function (data) {
            updateCurrentWeather(data);
        })

    fetch(coordinatesURL) 
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (data.length === 0) {
                return;
            } else {
                var lattitude = data[0].lat;
                var longitude = data[0].lon;
            }

    var forecastURL = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + lattitude + '&lon=' + longitude + '&units=imperial&appid=' + APIKey;

    fetch(forecastURL) 
        .then(function (response) {
            return response.json();         
        })
        .then(function (data) {
            console.log(data); // Replace this what what data you want to take from it -> store to variables
        })
    })
}

callAPI();


function updateCurrentWeather(data) {
    // Updating title of current city + day
    cityAndDate.textContent = data.name + ' ' + moment().format('MM/DD/YYYY');
    // Assigning values to the temperature, wind speed, and humidity for the current day using data from the API
    tempCurrent.textContent = data.main.temp + '°F';
    windCurrent.textContent = data.wind.speed + ' MPH';
    humidityCurrent.textContent = data.main.humidity + '%';
    // Updating the icon for the current day's weather using data from the API
    var iconIDCurrent = data.weather[0].icon;
    iconURLCurrent = 'http://openweathermap.org/img/w/' + iconIDCurrent + '.png';
    iconCurrent.setAttribute('src', iconURLCurrent);
}
    
function updateForecast(data) {

}



