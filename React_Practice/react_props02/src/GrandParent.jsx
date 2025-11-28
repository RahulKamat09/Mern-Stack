import React from 'react'
import Parent from './Parent'

function GrandParent(props) {
  return (
    <div>
        <Parent product={props.product}/>
    </div>
  )
}

export default GrandParent