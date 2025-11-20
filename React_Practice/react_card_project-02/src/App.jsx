import React from 'react'
import Card from './components/Card'

const App = () => {
  const products = [
    {
      productImage: "https://images.unsplash.com/photo-1528701800489-20be9f0ee2ef",
      brandName: "Nike",
      price: "$59"
    },
    {
      productImage: "https://images.unsplash.com/photo-1606813902917-392b37a9a5ab",
      brandName: "Adidas",
      price: "$65"
    },
    {
      productImage: "https://images.unsplash.com/photo-1519741497674-611481863552",
      brandName: "Puma",
      price: "$49"
    },
    {
      productImage: "https://images.unsplash.com/photo-1614252235316-8fcb0cdc6a12",
      brandName: "Reebok",
      price: "$55"
    },
    {
      productImage: "https://images.unsplash.com/photo-1603792907191-89f8c3c76fb8",
      brandName: "Under Armour",
      price: "$72"
    },
    {
      productImage: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
      brandName: "New Balance",
      price: "$68"
    },
    {
      productImage: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
      brandName: "Skechers",
      price: "$45"
    },
    {
      productImage: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60",
      brandName: "Fila",
      price: "$39"
    },
    {
      productImage: "https://images.unsplash.com/photo-1549298916-b41d501d3772",
      brandName: "Asics",
      price: "$78"
    },
    {
      productImage: "https://images.unsplash.com/photo-1600180758895-6fc5d8eac6df",
      brandName: "Bata",
      price: "$29"
    }
  ];


  return (
    <div className='paren flex flex-wrap'>
      {products.map(function (product, index) {
        return (
          <div key={index}>
            <Card
              productImage={product.productImage}
              brandName={product.brandName}
              price={product.price}
            />
          </div>
        )
      }
      )}
    </div>
  )
}

export default App