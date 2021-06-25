import React from 'react'
import { VStack, Heading, Text, Button } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, LikeBlog } from '../../reducers/blogReducer'
import { showNotification } from '../../reducers/notificationReducer'
import Comments from './Comments'

const BlogView = ({ blog }) => {
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.user.username)
  if (!blog) {
    return null
  }

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
    <VStack p={8} spacing={8}>
      <VStack spacing={4}>
        <Heading>
          {blog.title} by {blog.author}
        </Heading>
        <Text fontSize='xl'>{blog.url}</Text>
        <Text fontSize='xl'>
          Likes: {blog.likes}
          <Button
            size='xs'
            onClick={addLike}
            variant='outline'
            colorScheme='green'
            mx={2}
          >
            Like
          </Button>
        </Text>
        <Text>{blog.user.username}</Text>
        {blog.user.username === currentUser && (
          <p>
            <Button size='md' onClick={remove}>
              Remove
            </Button>
          </p>
        )}
      </VStack>
      <Comments blog={blog} />
    </VStack>
  )
}

export default BlogView
