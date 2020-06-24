
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import AuthorForm from './components/AuthorForm'

import { ALL_AUTHORS, ALL_BOOKS } from './queries'
import { useQuery } from '@apollo/client'


const App = () => {
  const [page, setPage] = useState('authors')
  const resultAuthors = useQuery(ALL_AUTHORS, {
    pollInterval: 10000
  })
  const resultBooks = useQuery(ALL_BOOKS, {
    pollInterval: 10000
  })


  if (resultAuthors.loading || resultBooks.loading) {
    return <div>loading...</div>
  }

  console.log({ resultBooks })

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('edit')}>Edit author</button>
      </div>

      <AuthorForm
        show={page === 'edit'} allAuthors={resultAuthors.data.allAuthors}
      />

      <Authors
        show={page === 'authors'} authors={resultAuthors.data.allAuthors}
      />

      <Books
        show={page === 'books'} books={resultBooks.data.allBooks}
      />

      <NewBook
        show={page === 'add'}
      />

      

    </div>
  )
}

export default App