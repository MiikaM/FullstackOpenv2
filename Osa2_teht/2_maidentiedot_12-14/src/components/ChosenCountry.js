import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CountryInfo from './CountryInfo'

const ChosenCountry = ({ country }) => {
    const [onko, setOnko] = useState(false)
    const [placeData, setPlaceData] = useState([])

    const api_key = process.env.REACT_APP_API_KEY

    useEffect(() => {
        axios
            .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`)
            .then(response => {
                setPlaceData(response.data)
            })
    })

    const handleOnko = () => {
        console.log('Onko', onko)
        if(!onko) setOnko(true)
        else setOnko(false)
    }

    if (onko) {
        return (
            <div>
                <div>
                    {country.name}
                    <button onClick={handleOnko}>
                        show
            </button>
                </div>
                <CountryInfo country={country} weather={placeData}/>
            </div>
        )
    }

    return (
        <div>
            {country.name}
            <button onClick={handleOnko}>
                show
            </button>
        </div>
    )
}

export default ChosenCountry
