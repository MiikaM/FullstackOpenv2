import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { BOOKS_BY_GENRE } from '../queries'
import _ from 'lodash'

const Books = (props) => {
  const [booksByGenres, { loading, data }] = useLazyQuery(BOOKS_BY_GENRE, {
    fetchPolicy: 'no-cache'
  })
  const [allBooks, setAllBooks] = useState(null)
  const [genre, setGenre] = useState('')

  useEffect(() => {
      booksByGenres({ variables: { genre: genre } })
  }, [props.books, genre]) // eslint-disable-line

  useEffect(() => {
    if(data) {
      setAllBooks(data.allBooks)
    }
  }, [data, props.books]) // eslint-disable-line

  if (!props.show || loading) {
    return null
  }

  if(!allBooks) {
    return <div>loading</div>
  }

  if(!props.books) {
    return <div>There is no books in the library</div>
  }
  const genres = props.books.map(b => b.genres.map(g => g))
  const reducedGenres = _.reduce(genres, (a, e) => {
    return a.concat(e)
  })
  const genresLodash = _.uniq(reducedGenres)

  return (
    <div>
      <h2>books</h2>
      <h4>in genre {genre}</h4>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th align='center'>
              author
            </th>
            <th align='right'>
              published
            </th>
          </tr>
          {allBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {
        genresLodash.map(genre =>
          <button key={genre} onClick={() => setGenre(genre)}>{genre}</button>
        )
      }
      <button onClick={() => setGenre('')}>all books</button>
    </div>
  )
}

export default Books