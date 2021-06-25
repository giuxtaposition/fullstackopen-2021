import React, { useEffect, useRef } from 'react'
import './App.css'
import BlogList from './components/Blogs/BlogList'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import AddBlogForm from './components/Blogs/AddBlogForm'
import Navbar from './components/Login/Navbar.'
import Users from './components/Users/Users'
import UserView from './components/Users/UserView'
import BlogView from './components/Blogs/BlogView'

import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { loggedIn } from './reducers/loginReducer'

import { ChakraProvider } from '@chakra-ui/react'

import { Switch, Route, useRouteMatch } from 'react-router-dom'
import { initializeUsers } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users)
  const blogs = useSelector(state => state.blogs)

  const blogFormRef = useRef()

  // GET blogs and GET Logged in user
  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(loggedIn())
    dispatch(initializeUsers())
  }, [dispatch])

  const userMatch = useRouteMatch('/users/:id')
  const user = userMatch
    ? users.find(user => user.id === userMatch.params.id)
    : null

  const blogMatch = useRouteMatch('/blogs/:id')
  const blog = blogMatch
    ? blogs.find(blog => blog.id === blogMatch.params.id)
    : null

  return (
    <ChakraProvider>
      <div className='App'>
        <Navbar />
        <Notification />

        <Switch>
          <Route path='/users/:id'>
            <UserView user={user} />
          </Route>

          <Route path='/blogs/:id'>
            <BlogView blog={blog} />
          </Route>

          <Route exact path='/'>
            <Togglable buttonLabel='Create New Blog' ref={blogFormRef}>
              <AddBlogForm />
            </Togglable>
            <div className='blog-list'>
              <BlogList />
            </div>
          </Route>

          <Route exact path='/users'>
            <Users />
          </Route>
        </Switch>
      </div>
    </ChakraProvider>
  )
}

export default App
