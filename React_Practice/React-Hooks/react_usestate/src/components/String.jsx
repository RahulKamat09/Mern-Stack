import React, { useState } from 'react'

function String() {
    const [name, setName] = useState()
  return (
    <div className='number'>
        <h2>UserName: {name}</h2>
        <input type="text" onChange={(e)=>setName(e.target.value)} />
    </div>
  )
}

export default String