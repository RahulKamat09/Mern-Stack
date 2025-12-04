import React from 'react'
import Number from './components/Number'
import String from './components/String'
import Boolean from './components/Boolean'
import Array from './components/Array'
import Object from './components/Object'
import Form from './components/Form'
import ChangingObject from './components/Array-Object/ChangingObject'
import ChangingArrayObject from './components/Array-Object/ChangingArrayObject'

const App = () => {
  return (
    <div>
      <Number/>
      <String/>
      <Boolean/>
      <Array/>
      <Object/>
      <ChangingObject/>
      <ChangingArrayObject/>
      <Form/>
    </div>
  )
}

export default App