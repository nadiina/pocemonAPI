import React, { useState, useEffect } from "react";
import PokemonList from "./component/PocemonList";
import axios from "axios";
import Button from "./component/Button";
import "./App.scss";
import Nav from "./component/Nav";
import Footer from "./component/footer";

export default function App() {
  const [pokemon, setPokemon] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon/?limit=12"
  );
  const [nextPageUrl, setNextPageUrl] = useState();
  const [loading, setLoading] = useState(true);
  const [clickCount, setClickCount] = useState(0); 

  useEffect(() => {
    setLoading(true);
    let cancel;
    axios
      .get(currentPageUrl, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((res) => {
        setLoading(false);
        setNextPageUrl(res.data.next);
        setPokemon(res.data.results.map((p) => p));
      });

    return () => cancel();
  }, [currentPageUrl]);

  function gotoNextPage() {
    setCurrentPageUrl(nextPageUrl);
    setClickCount(clickCount + 1); 
  }

 
  if (loading) return "Loading...";

  return (
    <div className="app">
      <Nav />
      <PokemonList pokemon={pokemon} click={clickCount} loading={loading} />
      <Button gotoNextPage={gotoNextPage} />
      <Footer />
    </div>
  );
}
