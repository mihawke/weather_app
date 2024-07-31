import './styles.css';

class Weather {
    constructor(location, day, date, time, temp, condition, icon) {
        this.location = location,
            this.day = day,
            this.date = date,
            this.time = time,
            this.temp = temp,
            this.condition = condition,
            this.icon = icon
    }
}


async function getWeather(location = 'Delhi') {
    const URL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/today?unitGroup=metric&key=JUE56LHK9Q5PEHWUS5SWXEMKW&contentType=json`
    const startTime = performance.now(); // Capture start time
    try {
        const response = await fetch(URL, { mode: "cors" });
        const weatherData = await response.json();

        const location = weatherData.address;
        const day = 'Today';
        const date = weatherData.days[0].datetime;
        const time = weatherData.currentConditions.datetime;
        const temp = weatherData.currentConditions.temp;
        const condition = weatherData.currentConditions.conditions;
        const icon = weatherData.currentConditions.icon;

        document.getElementById('location').textContent = `Current Location: ${location}`;
        document.getElementById('day').textContent = `Day: ${day}`;
        document.getElementById('date').textContent = `Date: ${date}`;
        document.getElementById('time').textContent = `Time Updated: ${time}`;
        document.getElementById('temp').textContent = `Temperature: ${temp}°C`; // Adjust unit as needed
        document.getElementById('condition').textContent = `Condition: ${condition}`;
        document.getElementById('icon').src = `https://your-icon-url-path/${icon}.png`; // Update the URL as necessary
        const endTime = performance.now(); // Capture end time
        const loadingTime = endTime - startTime; // Calculate loading time
        console.log(`Loading Time: ${loadingTime.toFixed(2)} ms`);

    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}
getWeather();

const form = document.querySelector('form')
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const location = form.get_location.value
    getWeather(location);
})
