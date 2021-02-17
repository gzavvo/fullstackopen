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
  const [weatherData, setWeatherData] = useState({})
  const [temperature, setTemperature] = useState(0)
  const [windSpeed, setWindSpeed] = useState(0)
  const [weatherIcon, setWeatherIcon] = useState('')

  useEffect(() => {
    axios
      .get('http://api.openweathermap.org/data/2.5/weather', {params})
      .then(response => {
        console.log('response.data: ', response.data)
        setWeatherData(response.data)
        setTemperature(response.data.main.temp)
        setWindSpeed(response.data.wind.speed)
        setWeatherIcon(response.data.weather[0].icon)
      })
  }, [capital])

  const srcImg=`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`

  return (
    <div>
      <div>
      temperature: {temperature}°C
      </div>
      <div>
        wind: {windSpeed} km/h
      </div>
      <img src={srcImg} alt="current weather icon" />
    </div>
  )
}

export default Weather
