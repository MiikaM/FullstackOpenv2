import React from 'react'

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