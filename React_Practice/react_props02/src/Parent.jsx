import React from 'react'
import Card from './Card'

function Parent(props) {
  return (
    <div>
        <Card product={props.product}/>
    </div>
  )
}

export default Parent