import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import Select from 'react-select';

import { EDIT_AUTHOR } from '../queries'
import Notify from './Notify'



const AuthorForm = (props) => {
  const [name, setName] = useState(null)
  const [setBornTo, setSBT] = useState(0)

  const [ editBornYear, result ] = useMutation(EDIT_AUTHOR)
  const [errorMessage, setErrorMessage] = useState(null)


  useEffect(() => {
     if (result.data && result.data.editAuthor === null) {
       notify('Author not found')
     }
  }, [result.data])
  
  if (!props.show) {
    return null
  }

  const authors = props.allAuthors
  const authorsMapped = authors.map(a => {return {...a, label: a.name}})

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }


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
      <Notify errorMessage={errorMessage} />
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