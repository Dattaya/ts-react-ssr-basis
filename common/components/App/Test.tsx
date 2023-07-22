import React, { type FC } from 'react'
import { gql, useQuery } from '@apollo/client'

const TEST_QUERY = gql`
  query Test {
    test
  }
`

const Test: FC = () => {
  const { error, data } = useQuery(TEST_QUERY, {
    // fetchPolicy: 'cache-first',
  })
  console.log(error, data)
  if (error) return <div>Error</div>
  return null
}

export default Test
