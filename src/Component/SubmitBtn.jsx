import {  useContext } from "react";
import Button from '@mui/material/Button';
import PropTypes from "prop-types";
import { AppContext } from '../Context/AppContext'
const SubmitBtn = ({
    setResponse
}
) => {
  const {fetchData,setDisable,setshowEdit}=useContext(AppContext)
  return (
    <div className=' w-full h-full flex flex-row py-8 gap-3 justify-end ' >
        <div className=' h-full flex' >
            <Button onClick={()=>{setResponse(true),fetchData(),setDisable(true), setshowEdit(false)}} variant="contained">Submit</Button>
        </div>
        <div className=' h-full flex pr-[35px]' >
            <Button onClick={()=>{}} variant="contained">Next</Button>
        </div>
    </div>
  )
}
SubmitBtn.propTypes = {
    setResponse: PropTypes.func.isRequired,
  };
export default SubmitBtn
