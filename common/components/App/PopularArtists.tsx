import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const popularArtistsQuery = gql`
  query PopularArtists {
    popular_artists {
      artists {
        name
      }
    }
  }
`

export default function PopularArtists() {
  const { data } = useQuery(popularArtistsQuery)
  console.log(data)
  if (data && data.popular_artists) {
    return (
      <ul>{data.popular_artists.artists.map(({ name }: { name: string }, i: number) => <li key={i}>{name}</li>)}</ul>
    )
  }
  return null
}
