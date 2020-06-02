import React from 'react'

/**
 * Displays the list of people that are in the database
 * deletion handler is passed on to the App component
 */

 //Creates the person line with a delete button
const Person = ({ person, deleteThis }) => {
    return (
        <p className="person">
            {person.name} {person.number}
            <button value={person.id} onClick={deleteThis}>delete</button>
        </p>
    )
}

//Passes each element individually to Person component
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