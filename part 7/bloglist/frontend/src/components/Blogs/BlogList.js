import React from 'react'
import { connect } from 'react-redux'
import Blog from './Blog'
import { Accordion, Box, Heading } from '@chakra-ui/react'

const BlogList = props => {
  return (
    <Box p={8}>
      <Heading>Blogs</Heading>
      <Accordion allowToggle my={2}>
        {props.blogs.map(blog => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </Accordion>
    </Box>
  )
}

const mapStateToProps = state => {
  return { blogs: state.blogs.sort((a, b) => b.likes - a.likes) }
}

const ConnectedBlogList = connect(mapStateToProps)(BlogList)
export default ConnectedBlogList
