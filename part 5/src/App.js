import React, { useState, useEffect } from 'react'
import './App.css'
import Blog from './components/Blog'
import Login from './components/Login'
import AddBlog from './components/AddBlog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  //Notification
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationStatus, setNotificationStatus] = useState('')

  //New Blog
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  // GET blogs
  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

  // GET Logged in user
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

      setNotificationStatus('success')
      setNotificationMessage(`${user.username} logged in successfully`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    } catch (exception) {
      setNotificationStatus('error')
      setNotificationMessage('Wrong credentials')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
    blogService.setToken(null)
    setNotificationStatus('success')
    setNotificationMessage(`${user.username} logged out successfully`)
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

  const addBlog = async event => {
    event.preventDefault()

    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    }

    try {
      const blog = await blogService.create(blogObject)
      setBlogs(blogs.concat(blog))

      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')

      setNotificationStatus('success')
      setNotificationMessage(
        `A new blog "${blogObject.title}" by ${blogObject.author} added successfully`
      )
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    } catch (error) {
      setNotificationStatus('error')
      setNotificationMessage(error)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <Notification message={notificationMessage} status={notificationStatus} />

      {user === null ? (
        <div>
          <h2>Login</h2>
          <Login
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            handleLogin={handleLogin}
          />
        </div>
      ) : (
        <>
          <div>
            <p>
              {user.username} logged in{' '}
              <button onClick={handleLogout}>Logout</button>
            </p>
            <h2>Add New Blog</h2>
            <AddBlog
              addBlog={addBlog}
              newTitle={newTitle}
              handleTitleChange={({ target }) => setNewTitle(target.value)}
              newAuthor={newAuthor}
              handleAuthorChange={({ target }) => setNewAuthor(target.value)}
              newUrl={newUrl}
              handleUrlChange={({ target }) => setNewUrl(target.value)}
            />
          </div>
          <h2>blogs</h2>
          {blogs.map(blog => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </>
      )}
    </div>
  )
}

export default App
