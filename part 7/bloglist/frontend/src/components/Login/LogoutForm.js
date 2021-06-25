import React from 'react'
import { connect } from 'react-redux'
import { logout } from '../../reducers/loginReducer'
import { showNotification } from '../../reducers/notificationReducer'
import { Button } from '@chakra-ui/button'

const LogoutForm = props => {
  const handleLogout = event => {
    event.preventDefault()
    try {
      props.logout()
      props.showNotification(
        `${props.user.username} logged out successfully!`,
        'success',
        3
      )
    } catch (exception) {
      props.showNotification(
        'Something went wrong, please try again',
        'error',
        3
      )
    }
  }
  return (
    <div>
      <p>
        {props.user.name} logged in{' '}
        <Button onClick={handleLogout}>Logout</Button>
      </p>
    </div>
  )
}

const mapStateToProps = state => {
  return { user: state.user }
}

const mapDispatchToProps = {
  logout,
  showNotification,
}

const ConnectedLogoutForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(LogoutForm)
export default ConnectedLogoutForm
