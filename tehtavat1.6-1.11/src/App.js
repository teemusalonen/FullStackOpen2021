import React, { useState } from 'react';

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
      good {good}
      <br/>
      neutral {neutral}
      <br/>
      bad {bad}
      <br/>
      all {all}
      <br/>
      average {average}
      <br/>
      positive {positive}%
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
      <button onClick={() => setGood(good + 1)}>
        good
      </button>
      <button onClick={() => setNeutral(neutral + 1)}>
        neutral
      </button>
      <button onClick={() => setBad(bad + 1)}>
        bad
      </button>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>  

  );
}
export default App;
