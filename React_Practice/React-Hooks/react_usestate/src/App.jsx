import React from 'react'
import Number from './components/Number'
import String from './components/String'
import Boolean from './components/Boolean'
import Array from './components/Array'
import Object from './components/Object'

const App = () => {
  return (
    <div>
      <Number/>
      <String/>
      <Boolean/>
      <Array/>
      <Object/>
    </div>
  )
}

export default App