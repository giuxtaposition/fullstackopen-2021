import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const Authors = props => {
  const result = useQuery(ALL_AUTHORS)

  // Edit Author Birthyear
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    errorPolicy: 'all',
    onError: ({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        props.setError(graphQLErrors[0].message)
      }
      if (networkError) {
        props.setError(networkError)
      }
    },
  })

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors

  const submit = async event => {
    event.preventDefault()

    if (name !== '' && born !== '') {
      editAuthor({
        variables: {
          name: name,
          setBornTo: parseInt(born),
        },
      })
      setName('')
      setBorn('')
    }
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map(a => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/*EDIT BIRTH YEAR*/}
      <h2>Set Birthyear</h2>
      <form onSubmit={submit}>
        <label>
          Author:
          <select value={name} onChange={({ target }) => setName(target.value)}>
            {authors.map(author => (
              <option value={author.name} key={author.name}>
                {author.name}
              </option>
            ))}
          </select>
        </label>
        <div>
          born{' '}
          <input
            type='number'
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>Update Author</button>
      </form>
    </div>
  )
}

export default Authors
