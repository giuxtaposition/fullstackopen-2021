import React, { useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const BooksList = props => {
  const { loading, error, data, refetch } = useQuery(ALL_BOOKS, {
    variables: { genres: props.genres },
  })

  useEffect(() => {
    refetch()
  }, [props.books])

  if (loading) return null
  if (error) return `Error! ${error}`

  return (
    <>
      {props.genres.length
        ? data.allBooks.map(book => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))
        : props.books.map(book => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
    </>
  )
}
export default BooksList
