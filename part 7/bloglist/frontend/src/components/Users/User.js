import React from 'react'
import { Tr, Td, Link, useColorModeValue } from '@chakra-ui/react'
import { Link as ReactRouterLink } from 'react-router-dom'

const User = ({ user }) => {
  return (
    <Tr>
      <Td>
        <Link
          as={ReactRouterLink}
          to={`/users/${user.id}`}
          px={2}
          py={1}
          rounded={'md'}
          _hover={{
            textDecoration: 'none',
            bg: useColorModeValue('gray.200', 'gray.700'),
          }}
          href={'#'}
        >
          {user.username}
        </Link>
      </Td>
      <Td isNumeric>{user.blogs.length}</Td>
    </Tr>
  )
}

export default User
