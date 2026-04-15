import React, { useEffect, useState } from 'react'
import { EmployeeData } from './EmployeeData'

const App = () => {
  const [data, setData] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState(0);
  const [id, setId] = useState(0);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    setData(EmployeeData);
  }, [])

  const handleEdit = (id) => {
    const dt = data.filter(item => item.id === id);
    if (dt !== undefined) {
      setIsUpdate(true);
      setId(id);
      setFirstName(dt[0].firstName);
      setLastName(dt[0].lastName);
      setAge(dt[0].age);
    }
  }

  const handleDelete = (id) => {
    if (id > 0) {
      if (window.confirm("Are You sure you want to delete Data!!?")) {
        const dt = data.filter((item) => item.id !== id);
        setData(dt);
      }
    }
  }

  const handleSave = (e) => {
    e.preventDefault();
    const dt = [...data];
    const newObject = {
      id:EmployeeData.length+1,
      firstName:firstName,
      lastName:lastName,
      age:age
    }
    dt.push(newObject);
    setData(dt);
  }

  const handleUpdate = () =>{
    const index = data.map((item)=>{
      return item.id;
    }).indexOf(id);

    const dt = [...data];
    dt[index].firstName = firstName;
    dt[index].lastName = lastName;
    dt[index].age = age;
    setData(dt);
    handleClear();
    alert(`Data Updated of ${firstName}`);
  }

  const handleClear = () => {
    setIsUpdate(false);
    setId(0);
    setFirstName('');
    setLastName('');
    setAge(0);
  }

  return (
    <>
      <div className="app my-4">

        <div className='d-flex justify-content-center align-items-center w-full '>
          <div>
            <label className='d-flex align-items-center me-3'>FirstName:
              <input
                type="text"
                name="firstname"
                placeholder='Enter Your Name'
                className='form-control'
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
              />
            </label>
          </div>
          <div>
            <label className='d-flex align-items-center me-3'>LastName:
              <input
                type="text"
                name="lastname"
                placeholder='Enter Your Last Name'
                className='form-control'
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
              />
            </label>
          </div>
          <div>
            <label className='d-flex align-items-center me-3'>Age:
              <input
                type="text"
                name="age"
                placeholder='Enter Your Age'
                className='form-control'
                onChange={(e) => setAge(e.target.value)}
                value={age}
              />
            </label>
          </div>
          <div>
            {
              !isUpdate ?
                <button className='btn btn-primary me-3' onClick={handleSave}>Save</button>
                : <button className='btn btn-primary me-3' onClick={(e) => handleUpdate(e.target.value)}>Update</button>
            }
            <button className='btn btn-secondary' onClick={handleClear}>Clear</button>
          </div>
        </div>

        <table className='table table-hover mt-3'>
          <thead>
            <tr>
              <th>Sr no</th>
              <th>Id</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Age</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              data.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.id}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.age}</td>
                    <td>
                      <button className='btn btn-primary me-2' onClick={() => handleEdit(item.id)}>Edit</button>
                      <button className='btn btn-danger me-2' onClick={() => handleDelete(item.id)}>Delete</button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </>
  )
}

export default App