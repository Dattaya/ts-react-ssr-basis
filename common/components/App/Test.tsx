import React, { type ReactNode } from 'react'
import { useQuery, gql } from '@apollo/client'

const testQuery = gql`
  query Test {
    artwork(id: "test-id") {
      slug
      internalID
    }
  }
`

export default function Test(): ReactNode {
  const { error } = useQuery(testQuery)
  console.log(typeof error)
  return (
    <div>
      Error:
      <pre style={{ maxWidth: '100%', overflowX: 'auto' }}>{error ? JSON.stringify(error, null, 2) : 'undefined'}</pre>
    </div>
  )
}
