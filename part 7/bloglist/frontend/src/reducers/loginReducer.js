import loginService from '../services/login'
import blogService from '../services/blogs'

const loginReducer = (state = '', action) => {
  switch (action.type) {
    case 'LOGGED_AT_STARTUP': {
      const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        blogService.setToken(user.token)
        return user
      } else {
        return ''
      }
    }
    case 'SET_LOGIN': {
      let user = action.data
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      return user
    }
    case 'SET_LOGOUT': {
      window.localStorage.removeItem('loggedBlogAppUser')
      blogService.setToken(null)
      return ''
    }
    case 'LOGIN_SUCCESS': {
      return { ...state, success: action.data }
    }
    default:
      return state
  }
}

export const logout = () => {
  return async dispatch => {
    dispatch({
      type: 'SET_LOGOUT',
    })
  }
}

export const setLogin = user => {
  return async dispatch => {
    await dispatch({
      type: 'SET_LOGIN',
      data: user,
    })
  }
}

export const login = async (username, password) => {
  return await loginService.login({
    username: username,
    password: password,
  })
}

export const loggedIn = () => {
  return async dispatch => {
    dispatch({
      type: 'LOGGED_AT_STARTUP',
    })
  }
}

export default loginReducer
