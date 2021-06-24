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

export const showNotification = message => {
  return {
    type: 'SHOW_NOTIFICATION',
    message,
  }
}

export const hideNotification = () => {
  return {
    type: 'HIDE_NOTIFICATION',
  }
}

export default notificationReducer
