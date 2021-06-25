import React from 'react'
import {
  VStack,
  Heading,
  Text,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react'

const UserView = ({ user }) => {
  if (!user) {
    return null
  }
  return (
    <VStack p={8}>
      <Heading>{user.name}</Heading>
      <Text fontSize='xl'>Added Blogs</Text>
      {user.blogs.length !== 0 ? (
        <UnorderedList>
          {user.blogs.map(blog => (
            <ListItem key={blog.id}>{blog.title}</ListItem>
          ))}
        </UnorderedList>
      ) : (
        <Text fontSize='xl'>No blogs added by this user</Text>
      )}
    </VStack>
  )
}

export default UserView
