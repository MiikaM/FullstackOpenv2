import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import Select from 'react-select';

import { EDIT_AUTHOR } from '../queries'



const AuthorForm = (props) => {
  const [name, setName] = useState(null)
  const [setBornTo, setSBT] = useState(0)
  const [editBornYear, result] = useMutation(EDIT_AUTHOR)

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      props.notify('Author not found')
    }
  }, [result.data]) // eslint-disable-line

  if (!props.show) {
    return null
  }

  const authors = props.allAuthors
  const authorsMapped = authors.map(a => { return { ...a, label: a.name } })

  const submit = async (event) => {
    event.preventDefault()
    editBornYear({ variables: { name, setBornTo } })

    setName('')
    setSBT(0)
  }

  const handleName = event => {
    setName(event.label)
  }

  return (
    <div>
      <h2>Edit author</h2>
      <form onSubmit={submit}>
        <div>
          <Select
            defaultValue={name}
            onChange={handleName}
            options={authorsMapped}
          />
        </div>
        <div>
          Born <input
            value={setBornTo}
            onChange={({ target }) => setSBT(Number(target.value))}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default AuthorForm