import React, { type ReactNode } from 'react'
import { useQuery, gql } from '@apollo/client'

const popularArtistsQuery = gql`
  query PopularArtists {
    popular_artists {
      artists {
        name
      }
    }
  }
`

export default function PopularArtists(): ReactNode {
  const { data } = useQuery(popularArtistsQuery)
  console.log(data)
  if (data && data.popular_artists) {
    return (
      <ul>{data.popular_artists.artists.map(({ name }: { name: string }, i: number) => <li key={i}>{name}</li>)}</ul>
    )
  }
  return null
}
