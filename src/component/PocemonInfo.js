import React from "react";
import "./style/_pocInfo.scss";

export default function PokemonDetails({ pokemonData }) {
  //  console.log(pokemonData);
      if (!pokemonData) {
        return <div></div>; 
      }
  return (
    <div className="card__info">
      <div>
        <h1>#{String(pokemonData.id).padStart(3, "0")}</h1>
        <img
          src={pokemonData.sprites.other["official-artwork"].front_default}
          alt=""
        />
        <h2> {pokemonData.name.toUpperCase()}</h2>
        <table>
          <tbody>
            <tr>
              <td>type:</td>
              <td>
                {pokemonData.types.map((type) => type.type.name).join(", ")}
              </td>
            </tr>
            {pokemonData.stats.map((poke) => (
              <tr key={poke.stat.name}>
                <td>{poke.stat.name}:</td>
                <td>{poke.base_stat}</td>
              </tr>
            ))}

            <tr>
              <td>weight:</td>
              <td>{pokemonData.weight}</td>
            </tr>
            <tr>
              <td>total moves:</td>
              <td>{pokemonData.moves.length}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
