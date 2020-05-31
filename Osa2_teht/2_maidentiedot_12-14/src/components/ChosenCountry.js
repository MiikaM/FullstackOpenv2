import React, { useState } from 'react'
import CountryInfo from './CountryInfo'

//Handles the show button and when to show a certain country info
const ChosenCountry = ({ country }) => {
    const [onko, setOnko] = useState(false)
    
    const handleOnko = () => {
        if (!onko) setOnko(true)
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
                <CountryInfo country={country} />
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
