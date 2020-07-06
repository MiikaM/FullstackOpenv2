import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { BOOKS_BY_GENRE, ME } from '../queries'

const Recommendations = (props) => {
  const [allBooks, setAllBooks] = useState(null)
  const [getBooks, { loading, data }] = useLazyQuery(BOOKS_BY_GENRE)
  const [getMe, result] = useLazyQuery(ME)

  useEffect(() => {
    getMe()
  }, [props.show])// eslint-disable-line

  useEffect(() => {
    if (result.data) {
      getBooks({
        variables: { genre: result.data.me.favoriteGenre }
      })
    }
  }, [result.data])// eslint-disable-line

  if (!props.show) {
    return null
  }

  if (!allBooks) {
    setAllBooks(data.allBooks)
    return <div>loading...</div>
  }

  if (loading || result.loading) return <div>loading...</div>

  return (
    <div>
      <h2>Recommendations</h2>
      <h4>Books in your favourite genre {result.data.me.favoriteGenre}</h4>
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
    </div>
  )
}

export default Recommendations