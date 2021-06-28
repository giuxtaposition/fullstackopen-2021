import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ALL_GENRES } from '../queries'
import BooksList from './BooksList'

const Books = props => {
  const [genres, setGenres] = useState([])
  const [showAll, setShowAll] = useState(true)
  const allGenresQuery = useQuery(ALL_GENRES)
  const allBooksQuery = useQuery(ALL_BOOKS)

  useEffect(() => {
    if (props.show) {
      if (showAll) {
        if (genres.length) {
          setGenres([])
        }
      }
      if (!genres.length) {
        setShowAll(true)
      }
    }
  }, [showAll, props.show, genres])

  if (!props.show) {
    return null
  }

  const allGenres = allGenresQuery.data.allGenres
  const allBooks = allBooksQuery.data.allBooks

  const handleGenresClicked = genre => {
    setShowAll(false)
    // IF not present add it
    if (!genres.includes(genre)) {
      setGenres(genres.concat(genre))
    } else {
      // If already present remove it
      setGenres(genres.filter(g => g !== genre))
    }
  }

  return (
    <div>
      <h2>books</h2>

      <div>
        {allGenres.map(genre => (
          <button
            key={genre}
            onClick={() => {
              handleGenresClicked(genre)
            }}
            className={`genre ${genres.includes(genre) ? 'active' : ''}`}
          >
            {genre}
          </button>
        ))}
        <button
          onClick={() => {
            setShowAll(true)
          }}
          className={`genre ${showAll ? 'active' : ''}`}
        >
          All
        </button>
      </div>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          <BooksList books={allBooks} genres={genres} />
        </tbody>
      </table>
    </div>
  )
}

export default Books
