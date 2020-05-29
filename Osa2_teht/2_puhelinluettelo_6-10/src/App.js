import React, { useState } from 'react'

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

        console.log('What happened', event)

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

    const handleNameChange = (event) => {
        console.log('nimi on', event.target.value)
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        console.log('Numero on', event.target.value)
        setNewNumber(event.target.value)
    }
    const Filter = (event) => {
        setShowAll(event.target.value)
    }
    const personsToShow = showAll === ''
        ? persons
        : persons.filter(person => person.name.toUpperCase().startsWith(showAll.toUpperCase()))


    return (
        <div>
            <h2>Phonebook</h2>
            <form>
                <div>
                    filter people with:
                <input
                        value={showAll}
                        onChange={Filter}
                    />
                </div>
            </form>
            <h3>Add person</h3>
            <form onSubmit={addAndCheckPerson}>
                <div>
                    name:
                    <input
                        value={newName}
                        onChange={handleNameChange}
                    />
                </div>
                <div>
                    number:
                    <input
                        value={newNumber}
                        onChange={handleNumberChange}
                    />
                </div>
                <div>
                    <button type="submit">Add</button>
                </div>
            </form>
            <h3>Numbers</h3>
            <PersonsList people={personsToShow} />
        </div>
    )

}

export default App