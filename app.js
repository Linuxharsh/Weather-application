
document.addEventListener('DOMContentLoaded', function() {
  const submitbutton = document.getElementById('submit-button');
const weatherdata = document.getElementById('weather-data');
const locationinput = document.getElementById('location');

const apikey = '6fbd44557d9c12cf3052556baae82d9d';

submitbutton.addEventListener('click', function() {
  const location = locationinput.value.trim();

  if(!location) {
    weatherdata.innerHTML ='<p> please enter the location.</p>';
    return;
  }
 
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apikey}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
             })
            .then(data => {
                weatherdata.innerHTML = `
                    <h3>${data.name}, ${data.sys.country}</h3>
                    <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="${data.weather[0].description}" width="100">
                    <p>Description: ${data.weather[0].description}</p>
                    <p>Temperature: ${data.main.temp} °C</p>
                    <p>Feels Like: ${data.main.feels_like} °C</p>
                    <p>Humidity: ${data.main.humidity}%</p>
                `;
            })
            .catch(error => {
                weatherdata.innerHTML = `<p>Error: ${error}</p>`;
            });
    });
});
