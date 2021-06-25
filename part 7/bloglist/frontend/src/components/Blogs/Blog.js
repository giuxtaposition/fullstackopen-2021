import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, LikeBlog } from '../../reducers/blogReducer'
import { showNotification } from '../../reducers/notificationReducer'

import {
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Button,
  Text,
  VStack,
  Link,
  useColorModeValue,
  HStack,
} from '@chakra-ui/react'
import { Link as ReactRouterLink } from 'react-router-dom'

const Blog = ({ blog }) => {
  const currentUser = useSelector(state => state.user.username)
  const dispatch = useDispatch()
  const [user, setUser] = useState('')

  Blog.propTypes = {
    blog: PropTypes.object.isRequired,
  }

  useEffect(() => {
    if (blog.user) {
      setUser(blog.user.username)
    }
  }, [blog.user])

  const addLike = () => {
    dispatch(LikeBlog(blog))
    dispatch(showNotification(`Liked '${blog.title}'`, 3))
  }

  const remove = async () => {
    const result = window.confirm(
      `Do you really want to delete ${blog.title} by ${blog.author}?`
    )
    if (result) {
      dispatch(deleteBlog(blog.id))
      dispatch(showNotification(`Deleted '${blog.title}'`, 3))
    }
  }

  return (
    <AccordionItem className='blog' py={2}>
      <h2>
        <HStack p={2}>
          <Box flex='1' textAlign='left' w='95%'>
            {' '}
            <Link
              as={ReactRouterLink}
              to={`/blogs/${blog.id}`}
              px={2}
              py={1}
              rounded={'md'}
              _hover={{
                textDecoration: 'none',
                bg: useColorModeValue('gray.200', 'gray.700'),
              }}
              href={'#'}
            >
              <b>{blog.title}</b> by {blog.author}
            </Link>
          </Box>
          <AccordionButton w='5%'>
            <AccordionIcon />
          </AccordionButton>
        </HStack>
      </h2>
      <AccordionPanel pb={4}>
        <VStack spacing={2} alignItems='left'>
          <Text>{blog.url}</Text>
          <Text>
            Likes: <span id='blog-likes'>{blog.likes}</span>{' '}
            <Button
              size='xs'
              onClick={addLike}
              variant='outline'
              colorScheme='green'
            >
              Like
            </Button>
          </Text>
          <Text>{user}</Text>
          {user === currentUser && (
            <Text>
              <Button size='md' onClick={remove}>
                Remove
              </Button>
            </Text>
          )}
        </VStack>
      </AccordionPanel>
    </AccordionItem>
  )
}

export default Blog
