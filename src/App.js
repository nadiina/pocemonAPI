import React, { useState, useEffect } from "react";
import PokemonList from "./component/PocemonList";
import axios from "axios";
import Pagination from "./component/Pagination";
import "./App.css";
import Nav from "./component/Nav";
import Footer from "./component/footer";

export default function App() {
  const [pokemon, setPokemon] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon/?limit=12"
  );
  const [nextPageUrl, setNextPageUrl] = useState();
  //const [prevPageUrl, setPrevPageUrl] = useState();
  const [loading, setLoading] = useState(true);
  const [clickCount, setClickCount] = useState(0); // Додали стан для лічильника

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
       // setPrevPageUrl(res.data.previous);
        setPokemon(res.data.results.map((p) => p));
        //console.log(res);
      });

    return () => cancel();
  }, [currentPageUrl]);

  function gotoNextPage() {
    setCurrentPageUrl(nextPageUrl);
    setClickCount(clickCount + 1); 
  }

 
  if (loading) return "Loading...";

  return (
    <>
      <Nav />
      <Pagination gotoNextPage={gotoNextPage} />
      <PokemonList pokemon={pokemon} click={(clickCount + 1) * 12} loading={loading} />
      <Footer />
    </>
  );
}
