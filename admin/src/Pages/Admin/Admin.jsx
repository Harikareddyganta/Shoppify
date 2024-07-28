import React from 'react'
import './Admin.css';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Addproduct from '../../Components/Addproduct/Addproduct';
import Listproduct from '../../Components/Listproduct/Listproduct';
import {Routes,Route} from 'react-router-dom'
const Admin = () => {
  return (
    <div className='admin'>
      <Sidebar/>
      <Routes>
        <Route path='/addProduct' element={<Addproduct/>} />
        <Route path='/listProduct' element={<Listproduct/>} />
      </Routes>
    </div>
  )
}

export default Admin
