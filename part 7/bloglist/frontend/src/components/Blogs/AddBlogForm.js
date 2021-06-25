import React, { useState } from 'react'
import { connect } from 'react-redux'
import { createBlog } from '../../reducers/blogReducer'
import { showNotification } from '../../reducers/notificationReducer'
import {
  VStack,
  Button,
  FormControl,
  Input,
  FormLabel,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react'

const AddBlogForm = props => {
  //New Blog
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = async event => {
    event.preventDefault()

    props.createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    })
    props.showNotification(`'${newTitle}' added successfully`, 'success', 3)
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <VStack
      alignItems='left'
      p={4}
      w='sm'
      border='1px solid'
      borderColor={useColorModeValue('gray.300', 'gray.700')}
      boxShadow='xl'
    >
      <Heading fontSize='xl'>Add New Blog</Heading>
      <form onSubmit={addBlog}>
        <FormControl>
          <FormLabel>title</FormLabel>
          <Input
            id='form-title'
            onChange={({ target }) => setNewTitle(target.value)}
            value={newTitle}
          />
        </FormControl>

        <FormControl>
          <FormLabel>author</FormLabel>
          <Input
            id='form-author'
            onChange={({ target }) => setNewAuthor(target.value)}
            value={newAuthor}
          />
        </FormControl>

        <FormControl>
          <FormLabel>url</FormLabel>
          <Input
            id='form-url'
            onChange={({ target }) => setNewUrl(target.value)}
            value={newUrl}
          />
        </FormControl>

        <Button type='submit' colorScheme='green' my={4}>
          save
        </Button>
      </form>
    </VStack>
  )
}

const mapDispatchToProps = {
  createBlog,
  showNotification,
}
const ConnectedAddBlogForm = connect(null, mapDispatchToProps)(AddBlogForm)
export default ConnectedAddBlogForm
