let emptyNotification = {
  message: '',
  status: '',
}

const notificationReducer = (state = emptyNotification, action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return action.notification
    case 'HIDE_NOTIFICATION':
      return emptyNotification
    default:
      return state
  }
}

var timeoutID

export const showNotification = (message, status, time) => {
  if (timeoutID) {
    clearTimeout(timeoutID)
  }
  return async dispatch => {
    clearTimeout()
    let notification = {
      message,
      status,
    }
    dispatch({
      type: 'SHOW_NOTIFICATION',
      notification,
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
