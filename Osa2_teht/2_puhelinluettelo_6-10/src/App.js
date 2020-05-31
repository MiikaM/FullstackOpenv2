import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonsList from './components/PersonsList'
import PersonsForm from './components/PersonsForm'
import personService from './services/persons'

const App = () => {
    const [persons, setPersons] = useState([])

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [showAll, setShowAll] = useState('')

    useEffect(() => {
        personService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
            })
    }, [persons])

    const updateNumber = ({ person }) => {
        console.log('The person is', person)
        const id = person.id

        const changedPerson = { ...person, number: newNumber }

        personService
            .update(id, changedPerson).then(returnedPerson => {
                setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
            })
            .catch(error => {
                alert(
                    `the note '${person.name}' was already deleted from server`
                )
                setPersons(persons.filter(n => n.id !== id))
            })
    }

    const addAndCheckPerson = (event) => {
        event.preventDefault()
        const person = persons.find(n => n.name === newName)
        if (person !== undefined) {
            if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
                updateNumber({ person })
            }
            return
        }

        // for (let i = 0; i < persons.length; i++) {
        //     if (persons[i].name.trim() === newName.trim()) {
        //         alert(`${newName} is already added to phonebook, replace the old number with a new one?`)

        //     }
        // }

        const personObject = {
            name: newName.trim(),
            number: newNumber.trim(),
        }

        personService
            .create(personObject)
            .then(returnedPerson => {
                setPersons(persons.concat(returnedPerson))
                setNewName('')
                setNewNumber('')
            })
    }

    const deletePerson = (event) => {
        const id = event.target.value
        const removable = persons.find(n => n.id = id)

        if (window.confirm(`Are you sure you want to remove ${removable.name} ?`)) {
            personService
                .deleteObject(id)
                .then()
                .catch(error => {
                    alert(`${removable.name} has already been removed`)
                })

        }
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
            <PersonsList people={personsToShow} deletePerson={deletePerson} />
        </div>
    )

}

export default App