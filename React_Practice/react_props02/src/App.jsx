import React from 'react'
import GrandParent from './GrandParent'


function App() {

  const product = [
    {
      imgSrc: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D",
      title: "Headphones",
      price: "$19.99"
    },
    {
      imgSrc: "https://images.unsplash.com/photo-1617043983671-adaadcaa2460?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c21hcnQlMjB3YXRjaHxlbnwwfHwwfHx8MA%3D%3D",
      title: "Smart Watch",
      price: "$49.99"
    },
    {
      imgSrc: "https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2FtZXJhfGVufDB8fDB8fHww",
      title: "Camera",
      price: "$99.99"
    },
    {
      imgSrc: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGFwdG9wfGVufDB8fDB8fHww",
      title: "Laptop",
      price: "$499.99"
    }
  ];

  return (
    <div className='container'>
      {product.map((item, index) => (
        <div key={index}>
          <GrandParent product={item} />
        </div>
      ))}
    </div>
  )
}

export default App