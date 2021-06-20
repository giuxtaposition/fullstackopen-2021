import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({ country }) => {
  const weather_api_key = process.env.REACT_APP_WEATHER_API_KEY
  const [weatherInfo, setWeatherInfo] = useState([])

  useEffect(() => {
    axios
      .get(
        'http://api.weatherstack.com/current' +
          '?access_key=' +
          weather_api_key +
          '&query=' +
          country.capital
      )
      .then(response => {
        setWeatherInfo(response.data.current)
      })
  }, [country.capital, weather_api_key])

  return (
    <div>
      <h1>{country.name}</h1>
      <p>Capital {country.capital}</p>
      <p>Population {country.population}</p>

      <h2>Spoken Languages</h2>
      <ul>
        {country.languages.map(language => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>
      <img
        width='auto'
        height='150px'
        src={country.flag}
        alt={`${country.name}-flag`}
      />

      <h2>Weather in {country.capital}</h2>
      <p>
        <b>Temperature:</b> {weatherInfo.temperature} °C
      </p>
      <img src={weatherInfo.weather_icons} alt='weather-icon' />
      <p>
        <b>Wind:</b> {weatherInfo.wind_speed} mph Direction{' '}
        {weatherInfo.wind_dir}
      </p>
    </div>
  )
}

export default Country
