import React from 'react'

/**
 * Creates an adding form, from which you can add a person.
 * PersonsForm doesn't handle anything by itself only passes the handlers to App component
 * @param {name} name the name of the person which the user has written
 * @param {number} number  the number which the user has written
 * @param {handleName} handleName handler for name change
 * @param {handleNumber} handleNumber handler for number change
 * @param {handleSubmit} handleSubmit handler for submitting the information from the form
 */
const PersonsForm = ({ name, number, handleName, handleNumber, handleSubmit }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                name:
                    <input
                    value={name}
                    onChange={handleName}
                />
            </div>
            <div>
                number:
                    <input
                    value={number}
                    onChange={handleNumber}
                />
            </div>
            <div>
                <button type="submit">Add</button>
            </div>
        </form>
    )
}

export default PersonsForm