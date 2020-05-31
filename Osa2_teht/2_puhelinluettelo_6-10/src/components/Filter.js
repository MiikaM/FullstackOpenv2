import React from 'react'

/**
 * Creates the filter form and passes handling to App component
 * @param {name} name is the filter by which filter peoples
 * @param {handleFilter} handleFilter is the handler for the filtering
 */
const Filter = ({ name, handleFilter }) => {

    return (
        <form>
            <div>
                filter people with:
                <input
                    value={name}
                    onChange={handleFilter}
                />
            </div>
        </form>
    )
}

export default Filter