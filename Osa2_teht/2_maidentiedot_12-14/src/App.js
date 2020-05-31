import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CountryList from './components/CountryList'


const App = () => {
    const [allCountries, setAllCountries] = useState([])
    const [countries, setCountries] = useState('')

    useEffect(() => {

        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                setAllCountries(response.data)
            })
    }, [])


    const handleFilter = event => setCountries(event.target.value)

    const countriesToShow = countries === ''
        ? allCountries
        : allCountries.filter(country => country.name.toUpperCase().startsWith(countries.toUpperCase()))

    return (
        <div>
            find countries:
            <input
                value={countries}
                onChange={handleFilter}
            />
            <CountryList countries={countriesToShow} />
        </div>
    )
}

export default App