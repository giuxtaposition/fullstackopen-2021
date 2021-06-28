import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, FAVORITE_GENRE } from '../queries'

const Recommended = props => {
  const { data: favoriteGenreData } = useQuery(FAVORITE_GENRE)
  const userFavoriteGenre = favoriteGenreData?.me.favoriteGenre

  const { loading, error, data } = useQuery(ALL_BOOKS, {
    variables: { genres: userFavoriteGenre },
  })

  if (loading) return null
  if (error) return `Error! ${error}`

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h1>Recommendations</h1>
      <p>books in your favorite genre: {userFavoriteGenre}</p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {data &&
            data.allBooks.map(book => (
              <tr key={book.title}>
                <td>{book.title}</td>
                <td>{book.author.name}</td>
                <td>{book.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommended
