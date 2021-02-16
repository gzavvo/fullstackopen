import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ capital }) => {
  console.log(capital)
  const api_key = process.env.REACT_APP_API_KEY
  const params = {
    q: capital,
    appid: api_key,
    units: "metric"
  }
  const [weatherData, setWeatherData] = useState(null)

  useEffect(() => {
    axios
      .get('http://api.openweathermap.org/data/2.5/weather', {params})
      .then(response => {
        console.log('response.data: ', response.data)
        setWeatherData(response.data)
        console.log('weatherData', weatherData)
      })
  }, [])


  return (
    <div>
      <div>
      temperature: {weatherData.main.temp}°C
      </div>
      <div>
        wind: {weatherData.wind.speed} km/h
      </div>
      <img src="http://openweathermap.org/img/wn/{weatherData.weather.icon}" alt="current weather icon" />
    </div>
  )
}

export default Weather
