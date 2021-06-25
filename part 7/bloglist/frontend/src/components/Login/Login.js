import React from 'react'
import { connect } from 'react-redux'
import { Button, useDisclosure } from '@chakra-ui/react'
import LogoutForm from './LogoutForm'
import LoginForm from './LoginForm'

const Login = props => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  if (props.user !== '') {
    return <LogoutForm />
  }

  return (
    <>
      <Button onClick={onOpen}>Login</Button>
      <LoginForm isOpen={isOpen} onClose={onClose} />
    </>
  )
}

const mapStateToProps = state => {
  return { user: state.user }
}

const ConnectedLogin = connect(mapStateToProps)(Login)
export default ConnectedLogin
