document.addEventListener('DOMContentLoaded', function () {
    const countryDropdown = document.getElementById('countryDropdown');
    const cityDropdown = document.getElementById('cityDropdown');
    const weatherContainer = document.getElementById('weatherContainer');
    const title = document.getElementById('cityCountry');

    // Fetch data from the API for the country dropdown
    fetch('https://countriesnow.space/api/v0.1/countries/info?returns=flag')
        .then(response => response.json())
        .then(data => {
            if (!data.error) {
                // Populate the country dropdown with options
                data.data.forEach(country => {
                    const option = document.createElement('option');
                    option.value = country.name;
                    option.text = country.name;
                    countryDropdown.appendChild(option);
                });
            } else {
                console.error('Error fetching data:', data.msg);
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

    // Event listener for the country dropdown change event
    countryDropdown.addEventListener('change', function () {
        const selectedCountry = countryDropdown.value;

        if (selectedCountry) {
            // Fetch cities based on the selected country
            fetch(`https://countriesnow.space/api/v0.1/countries/cities/q?country=${encodeURIComponent(selectedCountry)}`)
                .then(response => response.json())
                .then(data => {
                    if (!data.error) {
                        // Clear the current options in the city dropdown
                        cityDropdown.innerHTML = '';

                        // Populate the city dropdown with options
                        data.data.forEach(city => {
                            const option = document.createElement('option');
                            option.value = city;
                            option.text = city;
                            cityDropdown.appendChild(option);
                        });
                    } else {
                        console.error('Error fetching data:', data.msg);
                    }
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        } else {
            // If no country is selected, clear the city dropdown
            cityDropdown.innerHTML = '';
        }
    });

    function getImagePath(cloudCover, precType) {
        // Define image directory
        const imgDir = 'img/';

        // Determine the image based on precipitation type
        if (precType === 'rain') {
            return imgDir + 'rain.png';
        }
        if (precType === 'snow') {
            return imgDir + 'snow.png';
        } else if (precType === 'ts') {
            return imgDir + 'ts.png';
        } else if (precType === 'tsrain') {
            return imgDir + 'tsrain.png';
        } else if (precType === 'none') {
            // Determine image based on cloud cover when there is no precipitation
            if (cloudCover <= 2) {
                return imgDir + 'clear.png';
            } else if (cloudCover >= 3 && cloudCover <= 7) {
                return imgDir + 'pcloudy.png';
            } else {
                return imgDir + 'cloudy.png';
            }
        }
        // Default case (optional)
        return imgDir + 'clear.png'; // if no information show clear
    }

    // Event listener for the city dropdown change event
    cityDropdown.addEventListener('change', function () {
        const selectedCountry = countryDropdown.value;
        const selectedCity = cityDropdown.value;

        if (selectedCountry && selectedCity) {
            title.innerText = `${selectedCountry} - ${selectedCity}`;
            // Fetch lat/lon based on the selected city and country
            fetch(`https://nominatim.openstreetmap.org/search.php?city=${encodeURIComponent(selectedCity)}&country=${encodeURIComponent(selectedCountry)}&format=jsonv2`)
                .then(response => response.json())
                .then(data => {
                    // Assuming the API returns an array of results
                    if (data.length > 0) {
                        const {
                            lat, lon
                        } = data[0]; // Get the first result's lat and lon

                        // Fetch weather data using the lat and lon
                        fetch(`https://www.7timer.info/bin/astro.php?lon=${encodeURIComponent(lon)}&lat=${encodeURIComponent(lat)}&ac=0&unit=metric&output=json&tzshift=0`)
                            .then(response => response.json())
                            .then(weatherData => {
                                // Clear existing weather data
                                weatherContainer.innerHTML = '';

                                // Display weather data in cards
                                weatherData.dataseries.forEach((item, index) => {
                                    if (index < 24) {
                                        // Create the weather card
                                        const card = document.createElement('div');
                                        card.className = 'weather-card weather-card-container';

                                        // Get the image path based on cloud cover and precipitation type
                                        const imagePath = getImagePath(item.cloudcover, item.prec_type);

                                        // Set the card's inner HTML with an image and weather details
                                        card.innerHTML = `
                                                <h4>+${item.timepoint} hrs</h4>
                                                <img src="${imagePath}" class="weather-image" alt="Weather Image">
                                                <p>${item.temp2m} °C</p>`;

                                        // Append the card to the container
                                        weatherContainer.appendChild(card);
                                    }
                                });
                            })
                            .catch(error => {
                                console.error('Error fetching weather data:', error);
                            });
                    } else {
                        console.error('No results found for the selected city and country');
                    }
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
    });
});
