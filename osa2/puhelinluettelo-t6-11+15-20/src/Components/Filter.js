import React from 'react'

const Filter = ({ visibilityHandler, searchValue }) => {
    
    return(
        <div>
            filter shown with <input onChange={visibilityHandler} value={searchValue}/>
        </div>
    )    
}

export default Filter