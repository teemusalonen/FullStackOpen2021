import React from "react"
import Part from './Part'

const Content = ({ parts }) => {

    return(
      /* VANHA TAPA =)
      <Part name={parts[0].name} exercises={parts[0].exercises} /> 
      <Part name={parts[1].name} exercises={parts[1].exercises} /> 
      <Part name={parts[2].name} exercises={parts[2].exercises} /> */
      <div>
        {parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />)}  
      </div>
    )
  }

  export default Content