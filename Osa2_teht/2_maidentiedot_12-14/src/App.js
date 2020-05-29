import React, { useState, useEffect } from 'react'

const Country = ({ country }) => {
    return (
        <p>
            {country.name}
        </p>
    )
}

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
        : allCountries.filter(country => country.toUpperCase().startsWith(countries.toUpperCase()))

    return (
        <div>
            find countries:
            <input
                value={countries}
                onChange={handleFilter}
            />
            <div>
                {
                    // TODO: Alikomponentit ja if
                    countriesToShow.map(country =>
                        <Country key={country.alpha3Code} country={country} />
                    )}
            </div>
        </div>
    )
}

export default App