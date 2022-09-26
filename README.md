# weather-dashboard

## Description

The motivation for this project was to design an application that allows a user to search for a particular city from around the world and display the current weather data for that city. By submitting the name of a city in the search field, the user is presented with today's weather conditions for that city, in addition to a forecast of what the weather is projected to be for the subsequent 5 days. For each day, the user is able to see the temperature, the wind speed, the humidity, and an icon representing that day's weather. Any viable previous searches are stored in the local storage and rendered as buttons for the user to conveniently revisit those searches. Note: the weather for the current day is accurate to the current time, but the weather represented in the 5-day forecast represents what the weather will be at 2pm PDT (9pm UTC) that day.

### Future Improvements

-Rather than creating elements for each piece of weather information initially, I could have created them in my JavaScript by using a for-loop. This would have saved some significant space in my code I believe.
-Allow the user to conveniently clear the local storage and thus remove the excess buttons created from their past searches.
-Prevent a button from being created for a past search that already exists as a button.

## Link to Deployed App

[Direct link to webpage](https://ottobisno.github.io/weather-dashboard/)

## Preview

![A preview of the app](https://github.com/ottobisno/weather-dashboard/blob/main/Assets/images/app-preview.JPG?raw=true)