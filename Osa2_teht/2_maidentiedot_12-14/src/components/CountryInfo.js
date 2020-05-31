import React from 'react'
import CountryLang from './CountryLang'
import Weather from './Weather'

//Shows the country info and calls the weather and countrylang component
const CountryInfo = ({ country}) => {
    
    return (
        <div>
            <h2>{country.name}</h2>
            <p>capital {country.capital}</p>
            <p>population {country.population}</p>
            <h4>languages</h4>
            <ul>
                <CountryLang language={country.languages} />
            </ul>
            <img src={country.flag} alt="Flag" width="300" height="300" />
            <div>
                <Weather place={country.capital} />
            </div>
        </div>
    )
}

export default CountryInfo