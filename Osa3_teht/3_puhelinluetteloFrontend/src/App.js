import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonsList from './components/PersonsList'
import PersonsForm from './components/PersonsForm'
import personService from './services/persons'
import Notification from './components/Notification'

/**
 * App handles all the changes and passes on the changes to the database.
 * App also creates the base for the website.
 */
const App = () => {

    /*Initializations */
    const [persons, setPersons] = useState([])
    const [showAll, setShowAll] = useState('')
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [errorMesssage, setErrorMessage] = useState(null)

    /*Handlers for name/number change annd for filter*/
    const handleNameChange = event => setNewName(event.target.value)
    const handleNumberChange = event => setNewNumber(event.target.value)
    const handleFilter = event => setShowAll(event.target.value)

    useEffect(() => {
        personService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
            })
    }, [])

    /* Updating the number for the person*/
    const updateNumber = ({ person }) => {
        const id = person.id
        const changedPerson = { ...person, number: newNumber.trim() }

        personService
            .update(id, changedPerson).then(returnedPerson => {
                setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
                setNewName('')
                setNewNumber('')
                setErrorMessage(`${returnedPerson.name}'s number was updated`)
                setTimeout(() => { setErrorMessage(null) }, 5000)

            })
            .catch(error => {
                setErrorMessage(`Information of ${changedPerson.name} was already removed from the server`)
                setTimeout(() => { setErrorMessage(null) }, 5000)
                setNewName('')
                setNewNumber('')
                setPersons(persons.filter(n => n.id !== id))
            })
    }


    /*Checks if the person is already in the database if not then adds the person */
    const addAndCheckPerson = (event) => {
        event.preventDefault()
        
        const person = persons.find(n => n.name === newName.trim())

        if (person !== undefined) {
            if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
                updateNumber({ person })
            }
            return
        }

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
                setErrorMessage(`Added ${returnedPerson.name} `)
                setTimeout(() => { setErrorMessage(null) }, 5000)
            }).catch(error => {
                setErrorMessage(`Can't add a person with no name`)
                setTimeout(() => { setErrorMessage(null) }, 5000)
                setNewName('')
                setNewNumber('')
            })
    }

    /*Deleting the information of the person chosen */
    const deletePerson = (event) => {
        console.log('Eventti on', event.target.value)
        const id = event.target.value
        const removable = persons.find(n => n.id === id)

        if (window.confirm(`Are you sure you want to remove ${removable.name} ?`)) {
            personService
                .deleteObject(id)
                .then(removed => {
                    setErrorMessage(`${removable.name} has been removed from the server`)
                    setTimeout(() => { setErrorMessage(null) }, 2000)
                    setPersons(persons.filter(n => n.id !== id))
                })
                .catch(error => {
                    setErrorMessage(`Information of '${removable.name}' was already removed from server`)
                    setTimeout(() => { setErrorMessage(null) }, 2000)
                })

        }
    }
    /*Creates the filtered list of persons */
    const personsToShow = showAll === ''
        ? persons
        : persons.filter(person => person.name.toUpperCase().startsWith(showAll.toUpperCase()))

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={errorMesssage} />
            <Filter name={showAll} handleFilter={handleFilter} />
            <h3>Add person</h3>
            <PersonsForm name={newName} number={newNumber} handleName={handleNameChange} handleNumber={handleNumberChange} handleSubmit={addAndCheckPerson} />
            <h3>Numbers</h3>
            <PersonsList people={personsToShow} deletePerson={deletePerson} />
        </div>
    )

}

export default App