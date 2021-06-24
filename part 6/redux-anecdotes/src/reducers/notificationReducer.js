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

var timeoutID

export const showNotification = (message, time) => {
  if (timeoutID) {
    clearTimeout(timeoutID)
  }
  return async dispatch => {
    clearTimeout()
    dispatch({
      type: 'SHOW_NOTIFICATION',
      message,
    })
    timeoutID = setTimeout(() => {
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
