import React, { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ filter, setFilter ] = useState('')
  
  const hook = () => {
    axios
     .get('https://restcountries.eu/rest/v2/all')
     .then(response => {
       setCountries(response.data)
     })
  }
  useEffect(hook, [])

  const handleFilter = (event) => {  
    setFilter(event.target.value)
  }

  /*const countriesToShow = ({ country }) => {5
    const copy = [...countries]
    
    copy.filter(country.name.toLowerCase().includes(filter.toLowerCase()))
    
    return (
      console.log('countriesToShow-metodi')

    )
  }*/
//{countries.map(country => <div>{country.name} <br /></div>)}
  return (
    <div>
      find countries <input onChange={handleFilter} value={filter}/>
      <div key={countries.name}>
        
      </div>
    </div>
  )
}

export default App;
