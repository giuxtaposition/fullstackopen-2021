import React, { useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { login, setLogin } from '../../reducers/loginReducer'
import { showNotification } from '../../reducers/notificationReducer'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  Input,
  FormLabel,
  Box,
} from '@chakra-ui/react'

const LoginForm = ({ isOpen, onClose }) => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await login(username, password)
      await dispatch(setLogin(user))
      dispatch(
        showNotification(`${username} logged in successfully!`, 'success', 3)
      )
    } catch (error) {
      dispatch(showNotification('Wrong Username or Password', 'error', 3))
    }
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Login</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleLogin}>
            <FormControl>
              <FormLabel>username</FormLabel>
              <Input
                id='login-username'
                type='text'
                value={username}
                name='Username'
                onChange={({ target }) => setUsername(target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>password</FormLabel>
              <Input
                id='login-password'
                type='password'
                value={password}
                name='Password'
                onChange={({ target }) => setPassword(target.value)}
              />
            </FormControl>
            <Box py={4}>
              <Button type='submit' id='login-button' colorScheme='green'>
                login
              </Button>
            </Box>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

const mapStateToProps = state => {
  return { user: state.user }
}

const mapDispatchToProps = {
  login,
  setLogin,
  showNotification,
}

const ConnectedLoginForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm)
export default ConnectedLoginForm
