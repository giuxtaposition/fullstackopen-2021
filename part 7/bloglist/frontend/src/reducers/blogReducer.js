import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS': {
      return action.data
    }
    case 'UPDATE_BLOG': {
      let newBlog = action.data
      return state.map(blog => (blog.id !== newBlog.id ? blog : newBlog))
    }
    case 'CREATE_BLOG': {
      return [...state, action.data]
    }
    case 'DELETE_BLOG': {
      let id = action.data
      return state.filter(blog => blog.id !== id)
    }
    default:
      return state
  }
}

export const LikeBlog = blog => {
  return async dispatch => {
    const newBlog = await blogService.update(blog.id, {
      ...blog,
      likes: blog.likes + 1,
    })
    dispatch({
      type: 'UPDATE_BLOG',
      data: newBlog,
    })
  }
}

export const addComment = (id, comment) => {
  return async dispatch => {
    const newBlog = await blogService.addComment(id, {
      comment: comment,
    })
    dispatch({
      type: 'UPDATE_BLOG',
      data: newBlog,
    })
  }
}

export const createBlog = content => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch({
      type: 'CREATE_BLOG',
      data: newBlog,
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export const deleteBlog = id => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: 'DELETE_BLOG',
      data: id,
    })
  }
}

export default blogReducer
