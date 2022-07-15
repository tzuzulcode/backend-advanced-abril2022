import React from 'react'
import { useQuery, gql } from '@apollo/client';

export default function App() {
  const {loading, error, data} = useQuery(gql`
    query Products {
      products {
        id
        name
        description
      }
    }
  `)
  return (
    <>
        <h1>React App</h1>
        {console.log({loading, error, data})}
    </>
  )
}
