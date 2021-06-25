import React from 'react'
import { VStack, Heading, Table, Thead, Tbody, Tr, Th } from '@chakra-ui/react'
import { connect } from 'react-redux'
import User from './User'

const Users = props => {
  return (
    <VStack p={8}>
      <Heading>Users</Heading>

      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th>Username</Th>
            <Th isNumeric>Blogs</Th>
          </Tr>
        </Thead>
        <Tbody>
          {props.users.map(user => (
            <User user={user} key={user.id} />
          ))}
        </Tbody>
      </Table>
    </VStack>
  )
}

const mapStateToProps = state => {
  return { users: state.users }
}

const ConnectedUsers = connect(mapStateToProps)(Users)
export default ConnectedUsers
