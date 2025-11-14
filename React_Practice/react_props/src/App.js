import React from 'react'
import Card from './components/Card'

function App() {
  return (
    <div className="parent">
      <Card
        user="Rahul Kamat"
        age={30}
        img="https://images.unsplash.com/photo-1762710940358-e3351cc9ff34?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
      <Card
        user="John Doe"
        age={25}
        img="https://images.unsplash.com/photo-1713325802296-963739e22f94?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
      <Card
        user="Jane Smith"
        age={28}
        img="https://plus.unsplash.com/premium_photo-1762861940206-61021182af2b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
      <Card
        user="Alice Johnson"
        age={32}
        img="https://plus.unsplash.com/premium_photo-1689609950112-d66095626efb?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
    </div>
  )
}

export default App
