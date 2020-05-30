import React from 'react'

const Weather = ({ currentWeather, name }) => {

    return (
        <div>
            <h3>Weather in {name}</h3>
            <h5>temperature: {currentWeather.temperature} </h5>
            <img src={currentWeather.weather_icons[0]} alt="Icon" />
            <h5>wind: {currentWeather.wind_speed} direction {currentWeather.wind_dir} </h5>
        </div>
    )
}

export default Weather