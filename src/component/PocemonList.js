import React, { useState } from "react";
import PokemonInfo from "./PocemonInfo";
import "./style/style.scss";

export default function PokemonList({ pokemon, click, loading }) {
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const fetchPokemonData = (url) => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setSelectedPokemon(data);
        console.log(url);
      })
      .catch((error) => {
        console.error("Oops...", error);
      });
  };

  if (loading) return "Loading...";

  return (
    <div className="container">
      {pokemon.map((p, id) => {
        const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
          (click + 1 - 12) * (id + 1)
        }.png`;
        return (
          <div
            className="card"
            key={id}
            onClick={() => fetchPokemonData(p.url)}
          >
            <img src={imageUrl} alt="" />
            {<PokemonInfo pokemonData={selectedPokemon} />}
            <h1>{p.name.toUpperCase()}</h1>
          </div>
        );
      })}
    </div>
  );
}
