import React, { useState } from 'react'
import {
  VStack,
  Heading,
  HStack,
  FormControl,
  Input,
  Button,
  UnorderedList,
  ListItem,
  Flex,
} from '@chakra-ui/react'
import { addComment } from '../../reducers/blogReducer'
import { showNotification } from '../../reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const Comments = ({ blog }) => {
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()
  const handleAddComment = event => {
    event.preventDefault()
    try {
      dispatch(addComment(blog.id, comment))
      dispatch(showNotification('Comment added', 'success', 3))
      setComment('')
    } catch (error) {
      dispatch(
        showNotification('Comment not added, please try again', 'error', 3)
      )
    }
  }
  return (
    <VStack spacing={2}>
      <Heading fontSize='xx-large'>Comments</Heading>

      <HStack>
        <form onSubmit={handleAddComment}>
          <FormControl as={Flex} flexDirection='row'>
            <Input
              onChange={({ target }) => setComment(target.value)}
              value={comment}
            />
            <Button type='submit' onClick={handleAddComment}>
              Add
            </Button>
          </FormControl>
        </form>
      </HStack>
      <VStack>
        <UnorderedList>
          {blog.comments &&
            blog.comments.map((comment, index) => (
              <ListItem key={`${blog.id}-${index}`}>{comment}</ListItem>
            ))}
        </UnorderedList>
      </VStack>
    </VStack>
  )
}

export default Comments
