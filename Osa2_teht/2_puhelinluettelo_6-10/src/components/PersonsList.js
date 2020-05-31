import React from 'react'

const Person = ({ person, deleteThis }) => {
    return (
        <p>
            {person.name} {person.number}
            <button value={person.id} onClick={deleteThis}>delete</button>
        </p>
    )
}

const PersonsList = ({ people, deletePerson }) => {
    return (
        <div>
            {
                people.map(person =>
                    <Person key={person.name} person={person} deleteThis={deletePerson} />
                )}

        </div>
    )
}

export default PersonsList