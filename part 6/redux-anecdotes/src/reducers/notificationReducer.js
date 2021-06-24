const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return action.message
    case 'HIDE_NOTIFICATION':
      return ''
    default:
      return state
  }
}

export const showNotification = (message, time) => {
  return async dispatch => {
    dispatch({
      type: 'SHOW_NOTIFICATION',
      message,
    })
    setTimeout(() => {
      dispatch(hideNotification())
    }, time * 1000)
  }
}

export const hideNotification = () => {
  return {
    type: 'HIDE_NOTIFICATION',
  }
}

export default notificationReducer
