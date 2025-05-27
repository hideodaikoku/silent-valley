import React from "react"
import charactersData from "../data/characters.json" // Import the JSON file

const Characters = () => {
  // Group characters by type
  const types = [...new Set(charactersData.map(character => character.type))] // Get unique types

  return (
    <div>
      <h1 style={{ textAlign: "left"}}>glossary</h1>
      {types.map(type => (
        <div key={type}>
          <h2>{type}</h2>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {charactersData
              .filter(character => character.type === type)
              .map(character => (
                <div
                  key={character.id}
                  style={{
                    textAlign: "center",
                  }}
                >
                  <h3 style={{textAlign: "left"}}><span>{character.image}</span>{" "}{character.name}</h3>
                  <p style={{textAlign: "left"}}>{character.description}</p>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Characters