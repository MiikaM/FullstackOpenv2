import React from 'react'
import CountryInfo from './CountryInfo'
import ChosenCountry from './ChosenCountry'

const CountryList = ({ countries }) => {
    if (countries.length > 9) return <p>Too many matches, specify anoter filter</p>
    
    if (countries.length === 1) {
        return (
            <div>
                <ChosenCountry country={countries[0]} />
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