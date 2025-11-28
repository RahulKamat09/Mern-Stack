import React from 'react'

function Card(props) {
  return (
    <div>
        <div className="card-container">
            <img src={props.product.imgSrc} alt="" />
            <h3 className='card-title'>{props.product.title}</h3>
            <p className='card-price'>Price: {props.product.price}</p>
            <button className="card-button">Buy Now</button>
        </div>
    </div>
  )
}

export default Card