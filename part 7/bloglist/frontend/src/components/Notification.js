import React from 'react'
import { connect } from 'react-redux'
import { Flex, Box, useColorModeValue, chakra } from '@chakra-ui/react'
import { CheckCircleIcon, WarningIcon } from '@chakra-ui/icons'

const Notification = props => {
  return (
    <>
      {props.notification.message !== '' && (
        <Flex
          w='full'
          bg='transparent'
          p={50}
          alignItems='center'
          justifyContent='center'
        >
          <Flex
            maxW='sm'
            w='full'
            mx='auto'
            bg={useColorModeValue('white', 'gray.800')}
            shadow='md'
            rounded='lg'
            overflow='hidden'
          >
            <Flex
              justifyContent='center'
              alignItems='center'
              w={12}
              bg={`${
                props.notification.status === 'success'
                  ? 'green.500'
                  : 'red.500'
              }`}
            >
              {props.notification.status === 'success' && (
                <CheckCircleIcon color='white' boxSize={6} />
              )}
              {props.notification.status === 'error' && (
                <WarningIcon color='white' boxSize={6} />
              )}
            </Flex>

            <Box mx={-3} py={2} px={4}>
              <Box mx={3}>
                <chakra.span
                  color={`${
                    props.notification.status === 'success'
                      ? 'green.500'
                      : 'red.500'
                  }`}
                  fontWeight='bold'
                >
                  {props.notification.status === 'success'
                    ? 'Success'
                    : 'Error'}
                </chakra.span>
                <chakra.p
                  color={useColorModeValue('gray.600', 'gray.200')}
                  fontSize='sm'
                >
                  {props.notification.message}
                </chakra.p>
              </Box>
            </Box>
          </Flex>
        </Flex>
      )}
    </>
  )
}

const mapStateToProps = state => {
  return { notification: state.notification }
}
const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification
