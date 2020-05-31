import React from 'react'
import CountryInfo from './CountryInfo'
import ChosenCountry from './ChosenCountry'

//Checks the length of the country list and acts accordingly calls Chosencountry and CountryInfo components
const CountryList = ({ countries }) => {
    if (countries.length > 9) return <p>Too many matches, specify another filter</p>
    
    if (countries.length === 1) {
        return (
            <div>
                <CountryInfo country={countries[0]} />
            </div>
        )
    }

    return (
        <div>
            {
                countries.map(country =>
                    <ChosenCountry key={country.alpha3Code} country={country} />
                )}
        </div>
    )
}

export default CountryList