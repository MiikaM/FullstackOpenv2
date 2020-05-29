import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonsList from './components/PersonsList'
import PersonsForm from './components/PersonsForm'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', important: true },
        { name: 'Ada Lovelace', number: '39-44-5323523', important: false },
        { name: 'Dan Abramov', number: '12-43-234345', important: false },
        { name: 'Mary Poppendieck', number: '39-23-6423122', important: false }
    ])

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [showAll, setShowAll] = useState('')



    const addAndCheckPerson = (event) => {
        event.preventDefault()

        for (let i = 0; i < persons.length; i++) {
            if (persons[i].name.trim() === newName.trim()) {
                alert(`${newName} is already added to phonebook`)
                return
            }
        }

        const personObject = {
            name: newName,
            number: newNumber,
            important: false
        }

        setPersons(persons.concat(personObject))
        setNewName('')
        setNewNumber('')
    }

    const handleNameChange = event => setNewName(event.target.value)

    const handleNumberChange = event => setNewNumber(event.target.value)

    const handleFilter = event => setShowAll(event.target.value)

    const personsToShow = showAll === ''
        ? persons
        : persons.filter(person => person.name.toUpperCase().startsWith(showAll.toUpperCase()))


    return (
        <div>
            <h2>Phonebook</h2>
            <Filter name={showAll} handleFilter={handleFilter} />
            <h3>Add person</h3>
            <PersonsForm name={newName} number={newNumber} handleName={handleNameChange} handleNumber={handleNumberChange} handleSubmit={addAndCheckPerson} />
            <h3>Numbers</h3>
            <PersonsList people={personsToShow} />
        </div>
    )

}

export default App