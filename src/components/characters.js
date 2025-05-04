import React from "react"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

const Characters = () => {
  const { id } = useParams()
  const [characters, setCharacters] = useState([])
  const [loading, setLoading] = useState(true)

  const {
    loading: queryLoading,
    error,
    data,
  } = useQuery(CHARACTER_QUERY, {
    variables: { id },
  })

  useEffect(() => {
    if (data) {
      setCharacters(data.character)
      setLoading(false)
    }
  }, [data])

  if (loading || queryLoading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <div>
      <h1>{characters.name}</h1>
      <p>{characters.description}</p>
      <img src={characters.image} alt={characters.name} />
    </div>
  )
}
