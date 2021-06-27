import React, { useState } from 'react';

const Button = ({text, handleClick}) => {
  return(
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const StatisticLine = ({text, value}) => {
  if(text === 'percentage'){
    return (
      <div>
        {text} {value}%
      </div>
    )
  }  
  return (
    <div>
      {text} {value} 
    </div>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const all = bad+good+neutral
  const average = (good-bad)/all
  const positive = good/all*100

  if(all === 0){
    return(
      <div>
        <h1>statistics</h1>
        No feedback given
      </div>
    )
  }
  return(
    <div>
      <h1>statistics</h1>
      <StatisticLine text='good' value={good} />
      <StatisticLine text='neutral' value={neutral} />
      <StatisticLine text='bad' value={bad} />
      <StatisticLine text='average' value={average} />
      <StatisticLine text='percentage' value={positive} />
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text='good' />
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button handleClick={() => setBad(bad + 1)} text='bad' />
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>  

  );
}
export default App;
