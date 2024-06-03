import './App.css'
import Input from './Screens/Input'
import FileUpload from './Screens/FileUpload';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom'
function App() {
  const [showResponse,setResponse]=useState(false)


  return (
    <div className=" bg-slate-100  flex flex-col justify-between min-h-screen w-full">
    
      <Routes>  
      <Route path="/ai" element ={<FileUpload />}/>
      <Route path='/' element={<Input showResponse={showResponse} setResponse={setResponse} />}/>    

   </Routes>
    </div>

  )
}

export default App
