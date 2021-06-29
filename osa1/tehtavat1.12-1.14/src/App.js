import React, { useState } from 'react'

const MostVoted = ({initial, points, anecdotes }) => {
  const copy = [...points]
  let biggest = 0
  let index = initial
  for(let i = 1; i < copy.length; i++){
    if(copy[i] >  biggest){
      biggest = copy[i]
      index = i
    }
  }
  
  return(
    <div>
      <h1>Anecdote with the most votes</h1>
      <p>
        {anecdotes[index]}
        <br />
        has {biggest} votes
      </p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array.apply(null, new Array(7)).map(Number.prototype.valueOf,0))

  const handleClick = () => {
    const copy = [...points]
    return(
      copy[selected] += 1,
      setPoints(copy)
    )
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <br />
      has {points[selected]} points
      <br />
      <button onClick={handleClick}>
        vote
      </button>
      <button onClick={() => setSelected(Math.floor((Math.random() * 7)))}>
        next anecdote
      </button>

      <MostVoted initial={selected} points={points} anecdotes={anecdotes} />
    </div>
  )
}

export default App