
import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import AuthorForm from './components/AuthorForm'
import LoginForm from './components/LoginForm'
import Notify from './components/Notify'
import Recommendations from './components/Recommendations'

import { ALL_AUTHORS, ALL_BOOKS } from './queries'
import { useQuery, useApolloClient } from '@apollo/client'


const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)

  const resultAuthors = useQuery(ALL_AUTHORS, {
    fetchPolicy: 'cache-and-network'
  })
  const resultBooks = useQuery(ALL_BOOKS, {
    fetchPolicy: 'cache-and-network'
  })

  const client = useApolloClient()

  useEffect(() => {
    const token = localStorage.getItem('library-user-token')
    if ( token ) {
      setToken(token)
    }
  }, [])

  if (resultAuthors.loading || resultBooks.loading) {
    return <div>loading...</div>
  }

  if (!resultAuthors.data || !resultBooks.data) {
    return <div>loading...</div>
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  if (!token) {
    return (
      <div>
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('login')}>login</button>
        </div>
        <Notify errorMessage={errorMessage} />

        <Authors
          show={page === 'authors'} authors={resultAuthors.data.allAuthors}
        />

        <Books
          show={page === 'books'} books={resultBooks.data.allBooks}
        />

        <LoginForm
          show={page === 'login'}
          setToken={setToken}
          setError={notify}
          setPage={setPage}
        />
      </div>
    )
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('edit')}>Edit author</button>
        <button onClick={() => setPage('recommend')}>Recommendations</button>
        <button onClick={() => logout()} >logout</button>
      </div>
      <Notify errorMessage={errorMessage} />

      <AuthorForm
        show={page === 'edit'} allAuthors={resultAuthors.data.allAuthors} notify={notify}
      />

      <Authors
        show={page === 'authors'} authors={resultAuthors.data.allAuthors}
      />

      <Books
        show={page === 'books'} books={resultBooks.data.allBooks}
      />

      <NewBook
        show={page === 'add'} notify={notify}
      />

      <Recommendations 
        show={page === 'recommend'} 
      />


    </div>
  )
}

export default App