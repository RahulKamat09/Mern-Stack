import React from 'react'
import AspectRatio from './components/Layout/Aspect_Ratio'
import Columns from './components/Layout/Column'
import BreakAfter from './components/Layout/BreakAfter'

const App = () => {
  return (
    <div className='parent'>
      <AspectRatio/>
      <Columns/>
      <BreakAfter/>
    </div>
  )
}

export default App