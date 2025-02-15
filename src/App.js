import { useState } from 'react';
import './App.css';

function App() {

  // States
  const [city, setCity] = useState(""); //Takes city name
  const [weather, setWeather] = useState(null); //stores weather data
  const [error, setError] = useState(null); //Track Erro Message

  // Api key
  const API_KEY = process.env.REACT_APP_WEATHER_API

  // Functions
  // Weather Emoji Function
  const getWeatherEmoji = (id_num) => {
    if (id_num >= 200 && id_num < 300) {
      return "⛈️";
    } 
    else if (id_num >= 300 && id_num < 400) {
      return "🌦️";
    }
    else if (id_num >= 500 && id_num < 600) {
      return "🌧️";
    }
    else if (id_num >= 600 && id_num < 700) {
      return "❄️";
    }
    else if (id_num >= 700 && id_num < 800) {
      return "🌫️";
    }
    else if (id_num === 800) {
      return "☀️";
    }
    else if (id_num >= 800 && id_num < 900) {
      return "☁️";
    }
     else {
      return "🌍";
    }
  }

  // Weather Data 
  const fetchWeatherData = async (e) => {
    e.preventDefault(); //prevent page reload

    if (!city) {
      alert("Please Enter a city");
      return; //prevent the code from running further
    }

    try {
      setError(null);//Resets previous errors before making api call
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error("City not found");
      }

      const data = await response.json();
      console.log(data);
      setWeather({
        name: data.name,
        temp: data.main.temp.toFixed(1), //rounds temp to one decimal place
        humidity: data.main.temp,
        description: data.weather[0].description,
        weatherId: data.weather[0].id,
        weatherEmoji: getWeatherEmoji(data.weather[0].id),
      });
  } catch (error) {
    console.log(error.message);
    setError(error.message)
    setWeather(null); //Clear the previous weather data
  }
};


return (
  <div className="app">
    <form className='weatherForm' onSubmit={fetchWeatherData}>
      <input
        type="text"
        className='cityInput'
        placeholder='Enter city'
        onChange={(e) => setCity(e.target.value)}
      />

      {/* Btn */}
      <button type='submit'>Get Weather</button>
    </form>

    {weather && (
      <div className='card'>
        <h1 className='cityDisplay'>{weather.name}</h1>
        <p className='tempDisplay'>{weather.temp}°C</p>
        <p className='humidityDisplay'>Humidity: {weather.humidity}%</p>
        <p className='weatherEmoji'>{weather.weatherEmoji}</p>
        <p className='descDisplay'>{weather.description}</p>


      </div>
    )}

    {error && (<div className='card'>
      <p className='errorDisplay'>City not found</p>
    </div>)}
  </div>
);
}

export default App;

// data.weather[0] – Accesses the first weather object in the array.
// data.weather[0].description – Extracts the description field (a human-readable weather description like "clear sky" or "light rain").