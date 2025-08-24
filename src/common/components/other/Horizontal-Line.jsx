import { Box } from '@chakra-ui/react'
import React from 'react'

export const HorizontalLine = ({...props}) =>  {
  return (
    <Box h="1px" bg="#00000025" w="100%" {...props} ></Box>
  )
}

export default HorizontalLine
