import React from 'react'

//Parses the language info and shows the languages as list items
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