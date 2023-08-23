import { useState } from 'react';
import './App.css';
import Card from './Card';

function App() {
  const maxPokemonId = 1009;
  const multiplier = 3; 
  const highScore = localStorage.getItem("highScore");
  
  const [difficulty, setDifficulty] = useState(1);
  const [cardHand, setCardHand] = useState([]);
  const [selected, setSelected] = useState([]);
  const [score, addToScore] = useState(0);
  const [play, setPlay] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  function nextRound(newScore){
    console.log(newScore);
    addToScore(newScore);
    let scoreToAdvance = 0;
    for (let i = 1; i <= difficulty; i++){
      scoreToAdvance = scoreToAdvance + (i * multiplier);
    }
    if ( newScore == scoreToAdvance ){
      setDifficulty(d => d + 1);
      shuffleHand(true, difficulty + 1);
      setSelected([]);
    } else { shuffleHand(false);}
  }
  function shuffleHand(newHand = false, numCards = difficulty){
    // shuffle existing cards if not a new round
    let hand = [];
    console.log("cardHand state: " + cardHand);
    if (!newHand){
      console.log(cardHand);
      hand = [...cardHand];

      for (let i = hand.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [hand[i], hand[j]] = [hand[j], hand[i]];
      }
    }
    else {
      // new hand
      const cardCount = numCards * multiplier;
      //console.log(cardCount);
      for (let i = 0; i < cardCount; i++){
        //console.log('i = '+ i);
        let n = Math.ceil(Math.random() * maxPokemonId);
        //console.log('n = '+ n);
        while (hand.includes(n)){
          n = Math.ceil(Math.random() * maxPokemonId);
        }
        hand.push(n);
      } 
    }

    setCardHand(hand);
  }
  function selectCard(id){
    if (selected.includes(id) == false){
      setSelected([...selected, id]);
      nextRound(score + 1);
    } 
    else {
      endGame();
    } 
  }
  function endGame(){
    if (score > highScore){
      localStorage.setItem("highScore", score);
    }
    setGameOver(true);
  }
  
  const cards = cardHand.map(card => 
  <Card pokemonId={card} key={card} handleClick={selectCard}/>);

  if (gameOver){
    return(
      <>
        <div className='game-over'>
          <p>Game Over</p>
          <p>Final Score: {score}</p>
          <button onClick={()=>{setPlay(false); setGameOver(false); addToScore(0); setDifficulty(1);
          }}>OK</button>
        </div>
      </>
      )
  }
  if (!play){
    return (
      <>
      <h1>Memory Game</h1>
        <p>Select settings</p>
        <button onClick={()=>{setPlay(true); shuffleHand(true);
          }}>Start Game</button>
      </>
    )
  } else {
    
    return (
      <>
        <h1>Memory Game</h1>
        <p>Click on card but do not click the same card twice!</p>
        <div id="score">Score:{score}</div>
        <div id="high-score">High Score: {highScore}</div>
        <div className='main-field'>
          {cards}
        </div>
        
      </>
    )
  }
}

export default App
