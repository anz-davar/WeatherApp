# Weather App using APIs and vanilla JS

This Weather App student project is a simple web application that allows users to select a country and city to view weather information for that location. It fetches data from two different APIs: one for obtaining a list of countries and their respective flags, and the other for retrieving weather information based on the selected city and country.

## How to Use

1. **Select Country**: Upon loading the page, the user is presented with a dropdown menu labeled "Country." This dropdown is populated with a list of countries fetched from the `https://countriesnow.space/api/v0.1/countries/info?returns=flag` API. Once a country is selected, the dropdown triggers an event listener to fetch cities within the selected country.

2. **Select City**: After selecting a country, the user can choose a city from the "City" dropdown menu. This dropdown is populated dynamically based on the selected country, utilizing the `https://countriesnow.space/api/v0.1/countries/cities/q?country=` API. Once a city is selected, the app fetches weather data for that specific city.

3. **View Weather**: The weather data is displayed below the dropdown menus in a container labeled "Weather data." The weather information consists of a series of cards, each representing a specific time interval (in hours) within the next 72 hours. The cards include details such as the time, temperature, and a visual representation of the weather condition (e.g., clear, cloudy, rainy), fetched from the `https://www.7timer.info/bin/astro.php` API based on the selected city's latitude and longitude.

## Additional Functionality

- **Image Path Determination**: The app includes a function `getImagePath()` to determine the appropriate image path based on the cloud cover and precipitation type. This function ensures that the correct weather icon is displayed for each time interval.

- **Error Handling**: The app incorporates error handling for API requests. If there's an error fetching data from either of the APIs, it will log the error message to the console.

## File Structure

- **HTML File (`index.html`)**: Contains the structure of the web page, including dropdown menus for selecting country and city, and a container for displaying weather data.

- **CSS File (`style.css`)**: Contains the styles for formatting the appearance of the web page elements.

- **JavaScript File (`app.js`)**: Contains the logic for fetching data from APIs, populating dropdown menus, displaying weather data, and determining image paths based on weather conditions.

## Dependencies

- This Weather App relies on two external APIs:
    - `https://countriesnow.space/api/v0.1/countries/info?returns=flag`: Provides country information and flags.
    - `https://www.7timer.info/bin/astro.php`: Provides weather forecast data.

**Note:** Ensure a stable internet connection to fetch data from the APIs successfully. In case of any errors or issues, check the browser console for error messages.

Feel free to explore the code further and customize it to suit your needs!
