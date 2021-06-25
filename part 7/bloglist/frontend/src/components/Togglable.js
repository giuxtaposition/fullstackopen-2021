import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

import { Button, Box } from '@chakra-ui/react'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return { toggleVisibility }
  })

  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
  }

  return (
    <Box p={4}>
      <Box style={hideWhenVisible} m={4}>
        <Button onClick={toggleVisibility} colorScheme='green'>
          {props.buttonLabel}
        </Button>
      </Box>
      <Box style={showWhenVisible} className='togglableContent' m={4}>
        {props.children}
        <Button onClick={toggleVisibility} my={4}>
          Cancel
        </Button>
      </Box>
    </Box>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable
