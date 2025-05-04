import React from "react"
import charactersData from "../data/characters.json" // Import the JSON file

const Characters = () => {
  // Group characters by type
  const types = [...new Set(charactersData.map(character => character.type))] // Get unique types

  return (
    <div>
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>characters</h1>
      {types.map(type => (
        <div key={type} style={{ marginBottom: "2rem" }}>
          <h2>{type}</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1rem",
            }}
          >
            {charactersData
              .filter(character => character.type === type)
              .map(character => (
                <div
                  key={character.id}
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    padding: "1rem",
                    textAlign: "center",
                    minWidth: "200px",
                  }}
                >
                  <div style={{ fontSize: "2rem" }}>{character.image}</div>
                  <h3>{character.name}</h3>
                  {/* <p>{character.description}</p> */}
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Characters