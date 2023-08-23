import { useState, useEffect } from 'react';
import './Card.css';

function Card({pokemonId, handleClick}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() =>{
    async function getPokemon(id){
      try{
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`, {mode: 'cors'});
        const json = await response.json();
        setData(json);
        setLoading(false);
        
        // const responseJSON = await response.json();
        // console.log(responseJSON.sprites.other["official-artwork"].front_default);
        // return responseJSON.sprites.other["official-artwork"].front_default;
      } catch (e) {   
        setError(e);
        setLoading(false); 
      }
    }
    getPokemon(pokemonId);
  }, []);
  
  if(data == null){
      return (<>loading</>)
  }
  return (
    
      <div className="card" onClick={()=> handleClick(pokemonId)}>
        <img src={data.sprites.other["official-artwork"].front_default}/>
        {data.name}
      </div>
  )
}

export default Card
