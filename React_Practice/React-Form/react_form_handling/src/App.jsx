import React from 'react'
import ControlledInput from './components/ControlledInput'
import UncontrolledInput from './components/UncontrolledInput'
import MultipleInputs from './components/MultipleInputs'
import FormSubmit from './components/FormSubmit'
import FormValidation from './components/FormValidation'
import DynamicInputs from './components/DynamicInputs'
import FileUpload from './components/FileUpload'

const App = () => {
  return (
    <div>
      <ControlledInput/>
      <UncontrolledInput/>
      <MultipleInputs/>
      <FormSubmit/>
      <FormValidation/>
      <DynamicInputs/>
      <FileUpload/>
    </div>
  )
}

export default App