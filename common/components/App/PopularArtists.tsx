import { type ReactNode } from 'react'
import { useQuery, gql } from '@apollo/client'

const popularArtistsQuery = gql`
  query PopularArtists {
    artwork(id: "christo-the-gates-project-for-central-park-5") {
      slug
      internalID
    }
  }
`

export default function PopularArtists(): ReactNode {
  const { error } = useQuery(popularArtistsQuery, {
    fetchPolicy: 'cache-first',
  })
  console.log(typeof error)

  return null
}
