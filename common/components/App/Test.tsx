import React, { type FC } from 'react'
import { gql, useQuery } from '@apollo/client'

const TEST_QUERY = gql`
  query Test($isEditable: Boolean = false) {
    test
  }
`

const Test: FC = () => {
  const { error } = useQuery(TEST_QUERY)
  console.log(error)

  if (error) return <div>Error</div>
  return null
}

export default Test
