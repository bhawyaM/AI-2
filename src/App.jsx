import './App.css'
import Input from './Component/Input'
import SubmitBtn from './Component/SubmitBtn'
import { useState } from 'react';
function App() {
  const [showResponse,setResponse]=useState(false)


  return (
    <div className=" bg-slate-100  flex flex-col justify-between min-h-screen w-full">
      <Input showResponse={showResponse} setResponse={setResponse} />
      <SubmitBtn setResponse={setResponse}/>
    </div>
  )
}

export default App
