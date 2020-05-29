import React from 'react'


const Person = ({ person }) => {
    return (
        <p>{person.name} {person.number}</p>
    )
}

const PersonsList = ({ people }) => {
    return (
        <div>
            {
                people.map(person =>
                    <Person key={person.id} person={person} />
                )}
        </div>
    )
}

export default PersonsList