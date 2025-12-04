import React, { useState } from 'react'

function String() {
  const [name, setName] = useState("");

  return (
    <div className='number'>
      <div className='card'>
        <h2>Enter Username</h2>

        <input type="text" placeholder="Type your name..." onChange={(e) => setName(e.target.value)} className='input-box' />

        <div className='display-box'>
          {name ? (<p><b>UserName:</b> {name}</p>) :
            (<p>Enter name above…</p>)
          }
        </div>
      </div>
    </div>
  );
}

export default String;
