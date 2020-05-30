import React from 'react'

const CountryLang = ({ language }) => {

    return (
        <div>
            {
                language.map(lang =>
                    <li key={lang.iso639_2}>
                        {lang.name}
                    </li>
                )
            }
        </div>
    )
}



export default CountryLang