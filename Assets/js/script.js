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

// Assigning the text content of each date
cityAndDate.textContent = city + ' ' + moment().format('MM/DD/YYYY');
day1.textContent = moment().add(1, 'days').format('MM/DD/YYYY');
day2.textContent = moment().add(2, 'days').format('MM/DD/YYYY');
day3.textContent = moment().add(3, 'days').format('MM/DD/YYYY');
day4.textContent = moment().add(4, 'days').format('MM/DD/YYYY');
day5.textContent = moment().add(5, 'days').format('MM/DD/YYYY');

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
var lattitude;
var longitude;
var todaysWeatherURL = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=' + APIKey;
var coordinatesURL = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=1&appid=' + APIKey;
var forecastURL;


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
            console.log(data); // Replace this what what data you want to take from it -> store to variables
        })

    fetch(coordinatesURL) 
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (data.length === 0) {
                return;
            } else {
                lattitude = data[0].lat;
                longitude = data[0].lon;
            }

    forecastURL = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + lattitude + '&lon=' + longitude + '&units=imperial&appid=' + APIKey;

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



    




