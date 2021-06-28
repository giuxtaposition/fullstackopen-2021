import { useMutation } from '@apollo/client'
import React, { useState, useEffect } from 'react'
import { LOGIN } from '../queries'

const Login = ({ setToken, setError, show, setPage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login, result] = useMutation(LOGIN, {
    errorPolicy: 'all',
    onError: ({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        setError(graphQLErrors[0].message)
      }
      if (networkError) {
        setError(networkError)
      }
    },
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('library-user-token', token)
    }
  }, [result.data, setToken])

  if (!show) {
    return null
  }

  const handleLogin = async event => {
    event.preventDefault()
    login({ variables: { username, password } })
    setPage('authors')
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          username:
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password:
          <input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default Login
