import React from 'react'

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