// Assigning elements of the page to variables
var searchInput = document.querySelector('#search-input');
var searchBtn = document.querySelector('#search-btn');
var resultsArea = document.querySelector('#results-area');
var searchHistoryEl = document.querySelector('#search-history');

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

// Defining variables for the API key and the search history
var APIKey = 'd3f83777345084da2e7a110bbd7deea0';
var searchHistory = [];

// Creating buttons for searches stored in local storage upon loading the page
init();

// Calling the openweather API
function callAPI () {
    var todaysWeatherURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=' + APIKey;
    // Fetching a response for the current day's weather
    fetch(todaysWeatherURL)
        .then(function (response) {
            if (!response.ok) {
                // Throwing an alert if the city name is invalid and returning the function
                alert('Please enter a valid city name');
                return;
            }
            return response.json();
        })
        // If the city search is valid, than the current information for that day will be updated, displayed on the page, stored locally, and have a button created for it
        .then(function (data) {
            updateCurrentWeather(data);
            storeSearch();
            createPastSearchBtn();
            resultsArea.dataset.state = 'shown';
            displayCheck();
        })

    var coordinatesURL = 'https://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=1&appid=' + APIKey;
    // Using the specified city to fetch its respective coordinates. The coordinates are necessary to use the 5-day forecast API below
    fetch(coordinatesURL) 
        .then(function (response) {
            return response.json();
        })
        // The below if statement omitts most false positive fetches and only returns those that have coordinate
        .then(function (data) {
            if (data.length === 0) {
                return;
            } else {
                // Storing the lat and long in variables to later fetch the 5-day forecast API
                var lattitude = data[0].lat;
                var longitude = data[0].lon;
            }

    var forecastURL = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lattitude + '&lon=' + longitude + '&units=imperial&appid=' + APIKey;
    // Fetching the 5-day forecast data
    fetch(forecastURL) 
        .then(function (response) {
            return response.json();         
        })
        .then(function (data) {
            // Updating the 5 cards on the page with the 5-day forecast data for the specified city
            updateForecast(data);
        })
    })
}

function updateCurrentWeather(data) {
    // Updating title of current city + day
    cityAndDate.textContent = data.name + ' ' + moment().format('MM/DD/YYYY');
    // Assigning values to the temperature, wind speed, and humidity for the current day using data from the API
    tempCurrent.textContent = data.main.temp + '°F';
    windCurrent.textContent = data.wind.speed + ' MPH';
    humidityCurrent.textContent = data.main.humidity + '%';
    // Updating the icon for the current day's weather using data from the API
    var iconIDCurrent = data.weather[0].icon;
    iconURLCurrent = 'https://openweathermap.org/img/w/' + iconIDCurrent + '.png';
    iconCurrent.setAttribute('src', iconURLCurrent);
}
    
function updateForecast(data) {
    // Assigning values to the temperature, wind speed, humidity, and icon for day 1 of the 5-day forecast using data from the API
    tempDay1.textContent = data.list[7].main.temp + '°F';
    windDay1.textContent = data.list[7].wind.speed + ' MPH';
    humidityDay1.textContent = data.list[7].main.humidity + '%';
    var iconIDDay1 = data.list[7].weather[0].icon;
    iconURLDay1 = 'https://openweathermap.org/img/w/' + iconIDDay1 + '.png';
    iconDay1.setAttribute('src', iconURLDay1);

    // Assigning values to the temperature, wind speed, humidity, and icon for day 2 of the 5-day forecast using data from the API
    tempDay2.textContent = data.list[15].main.temp + '°F';
    windDay2.textContent = data.list[15].wind.speed + ' MPH';
    humidityDay2.textContent = data.list[15].main.humidity + '%';
    var iconIDDay2 = data.list[15].weather[0].icon;
    iconURLDay2 = 'https://openweathermap.org/img/w/' + iconIDDay2 + '.png';
    iconDay2.setAttribute('src', iconURLDay2);

    // Assigning values to the temperature, wind speed, humidity, and icon for day 3 of the 5-day forecast using data from the API
    tempDay3.textContent = data.list[23].main.temp + '°F';
    windDay3.textContent = data.list[23].wind.speed + ' MPH';
    humidityDay3.textContent = data.list[23].main.humidity + '%';
    var iconIDDay3 = data.list[21].weather[0].icon;
    iconURLDay3 = 'https://openweathermap.org/img/w/' + iconIDDay3 + '.png';
    iconDay3.setAttribute('src', iconURLDay3);

    // Assigning values to the temperature, wind speed, humidity, and icon for day 4 of the 5-day forecast using data from the API
    tempDay4.textContent = data.list[31].main.temp + '°F';
    windDay4.textContent = data.list[31].wind.speed + ' MPH';
    humidityDay4.textContent = data.list[31].main.humidity + '%';
    var iconIDDay4 = data.list[31].weather[0].icon;
    iconURLDay4 = 'https://openweathermap.org/img/w/' + iconIDDay4 + '.png';
    iconDay4.setAttribute('src', iconURLDay4);
    
    // Assigning values to the temperature, wind speed, humidity, and icon for day 5 of the 5-day forecast using data from the API
    tempDay5.textContent = data.list[39].main.temp + '°F';
    windDay5.textContent = data.list[39].wind.speed + ' MPH';
    humidityDay5.textContent = data.list[39].main.humidity + '%';
    var iconIDDay5 = data.list[39].weather[0].icon;
    iconURLDay5 = 'https://openweathermap.org/img/w/' + iconIDDay5 + '.png';
    iconDay5.setAttribute('src', iconURLDay5);
}


// Handles the search input from the main search button
function searchHandlerMain (event) {
    event.preventDefault();
    city = searchInput.value;
    callAPI();
}

// Adding event listener to the main search button
searchBtn.addEventListener('click', searchHandlerMain);

// Creates a button element for any successful search for a city and appends it the search history along with provides it with a click event.
function createPastSearchBtn () {
    var pastSearchBtn = document.createElement('button');
    pastSearchBtn.textContent = city;
    pastSearchBtn.setAttribute('type', 'button');
    pastSearchBtn.classList.add('btn', 'btn-dark', 'past-search-btn', 'btn-outline-secondary', 'w-100', 'mb-3');
    searchHistoryEl.append(pastSearchBtn);
    pastSearchBtn.addEventListener('click', searchHandlerPast);
}

// Handles the search input from buttons created from previous searches
function searchHandlerPast (event) {
    city = event.target.textContent;
    callAPI();
}

// Adding event listener to the buttons created from previous searches. This allows the user to interact with the past search buttons that appeared upon loading the page
var allPastSearchBtns = document.querySelectorAll('.past-search-btn');

allPastSearchBtns.forEach(item => {
    item.addEventListener('click', searchHandlerPast);
})

// Stores a successful search in the local storage
function storeSearch () {
    searchHistory.push(city);
    localStorage.setItem('Past Searches', JSON.stringify(searchHistory))
}

// Checks the local storage for past searches and initializes creating button elements for them if so. Also hides the results-area.
function init () {
    var storedSearches = JSON.parse(localStorage.getItem("Past Searches"))

    if (storedSearches !== null) {
        searchHistory = storedSearches;
    }
    createPastSearchBtnOnPageLoad();
    resultsArea.dataset.state = 'hidden';
    displayCheck();
}

// Creates a button element for each past search stored in the local storage
function createPastSearchBtnOnPageLoad () {
    for (var i = 0; i < searchHistory.length; i++) {
        var pastSearchBtn = document.createElement('button');
        pastSearchBtn.textContent = searchHistory[i];
        pastSearchBtn.setAttribute('type', 'button');
        pastSearchBtn.classList.add('btn', 'btn-dark', 'past-search-btn', 'btn-outline-secondary', 'w-100', 'mb-3');
        searchHistoryEl.append(pastSearchBtn);
    }
}

