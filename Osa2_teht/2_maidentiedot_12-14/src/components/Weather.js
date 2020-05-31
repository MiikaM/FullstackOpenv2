import React, { useState, useEffect } from 'react'
import axios from 'axios'

//Shows the weather of the capital of the country we are looking at and returns the weather info
const Weather = ({ place }) => {
    const [placeData, setPlaceData] = useState([])

    useEffect(() => {
        const aborter = new AbortController();
        const api_key = process.env.REACT_APP_API_KEY

        //Tries to make the get request if it doesn't succeed catches it
        try {
            axios
                .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${place}`)
                .then(response => {
                    setPlaceData(response.data)
                })
        } catch (e) {
            if(!aborter.signal.aborted) console.log('error', e)
        }
        
        //Aborts the DOM request
        return () => {
            aborter.abort();
            console.log('Cleaned')
        }
    }, [place])

    //The initial call when the weather data hasn't been fetched yet
    if (placeData.length < 1) {
        return <div></div>
    }

    return (
        <div>
            <h3>Weather in {place}</h3>
            <h5>temperature: {placeData.current.temperature} </h5>
            <img src={placeData.current.weather_icons[0]} alt="Icon" />
            <h5>wind: {placeData.current.wind_speed} direction {placeData.current.wind_dir} </h5>
        </div>

    )
}

export default Weather