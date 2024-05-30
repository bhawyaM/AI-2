// import React from 'react'
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import { deepOrange, deepPurple } from "@mui/material/colors";
import {  useContext, useState ,useEffect} from "react";
import PropTypes from "prop-types";
import { AppContext } from '../Context/AppContext'
import EditIcon from '@mui/icons-material/Edit';
import Spinner from '../Spinner'

// eslint-disable-next-line no-unused-vars
const Input = ({ showResponse, setResponse }) => {
  const {data, posts ,curretnIndex, setIndex,components, setComponet,setPost,disable,setDisable,loading,showEdit,setshowEdit}=useContext(AppContext)


  const [active, setActive]= useState(0);
  // let promtIndex = data[active]?.answer.length - 1;
  useEffect(() => {
    if (data[active]?.answer) {

      let promptIndex = data[active]?.answer;
      setshownAnswer(promptIndex);
    }
  }, [data, active]);
  const[shownAnswer,setshownAnswer]=useState(null)

  // const [question,setQuestion]=useState([]);
  function addComponet() {
    const value = [...components, []];
    setComponet(value);
    setIndex(components.length);

    console.log(data)
    console.log(posts)
  }

//   const valueCheck =  (i) => {
//    console.log(shownAnswer)
//   //  console.log(promtIndex)
//    console.log(data[active]?.answer[data[active]?.answer.length - 1])
//     setPost(data[active]?.answer[i]);
//     setQuestion(data[active]?.question[i])
   
// console.log(data[active]?.answer[i])
//   };

function valueCheck (i){
  setPost(data[i]?.answer);
  console.log(data)
  console.log(shownAnswer)
  console.log(active)
}

  const handleChange = (value, i) => {
    const inputData = [...components];
    inputData[i] = value;
    setComponet(inputData);
  };

  return (
    <div className=" h-full flex flex-col justify-between items-center w-full gap-8  py-8">
      <div className=" h-full flex flex-row gap-20 w-[90%]">
        {/* input container */}
        <div className=" h-full flex flex-col gap-10 w-[40%]">
          {components.map((data, i) => {
            return (
              <>
                <div
                  key={i + 1}
                  className=" h-full flex flex-row gap-3 w-full "
                  onClick={()=>{setActive(i)
                    ,valueCheck(i)
                    ,console.log('hello')}}
                 
                >
                  <div className=" flex flex-col justify-between items-end ">
                    <Avatar sx={{ bgcolor: deepOrange[500] , width:30,height:30,fontSize:15}}>BM</Avatar>
                    {showEdit?<EditIcon onClick={()=>{setDisable(false),setshowEdit(false)}} fontSize="extrasmall"/>:null}
                    
                  </div>
                  <div className="w-full rounded-[10px] "
                   style={active==i?{backgroundColor:"white"}:null}
                 >
                    <TextField
                      className=" w-full"
                      id="outlined-multiline-flexible"
                      placeholder="Prompt"
                      InputLabelProps={{ shrink: true }} 
                      sx={{
                        "& .MuiInputBase-input": {
                          color: disable ? "grey" : "black",
                        },
                        "& fieldset": { border: 'none' },
                        ...(disable && active === i ? { backgroundColor: "white" ,width:"100%",borderRadius:'10px',} : {}),
                     
                      }}
                      onChange={(e) => handleChange(e.target.value, i)}
                      multiline
                      InputProps={{
                        readOnly: disable,
                      }}
                      // style={{ color: disable ? "red" : "initial",}}
                  
                    />
                  </div>
                  {curretnIndex === i || components.length === 0 ? (
                    <button onClick={(event) => {addComponet(i),event.stopPropagation()}}>
                      <Avatar sx={{ bgcolor: "transparent", color: "black" }}>
                        +
                      </Avatar>
                    </button>
                  ) : null}
                </div>
              </>
            );
          })}
        </div>
        {/* response container */}
        {showResponse && (
          <div className="h-full flex flex-col  w-[60%]">
          <div className=" mt-10 h-full flex flex-row gap-3 w-full">
            <div className=" flex items-start">
              <Avatar sx={{ bgcolor: deepPurple[500] , width:30,height:30,fontSize:15}}>AI</Avatar>
            </div>
            <div className="w-full  bg-white rounded-[10px] ">
            {loading?
              <div className="w-full h-[300px] flex items-center justify-center">
                <div>
                  <Spinner/>
                </div>

              </div>
 
              
              :
              
              <TextField
                className=" w-full"
                id="outlined-multiline-flexible"
                placeholder="Response"
                InputLabelProps={{ shrink: true }} 
                sx={{
                  "& fieldset": { border: 'none' },
                }}
                value={posts}
                multiline
                minRows={5}
              />
            }

            </div>
            
          </div>

          {/* <div className="w-full h-full  flex flex-row justify-center gap-[100px]">
          <div 
          onClick={()=>{valueCheck(shownAnswer-1),setshownAnswer(shownAnswer-1),console.log(shownAnswer)}}
          className=" pl-[30px] text-gray-600 hover:text-black transition duration-300 ease-in-out hover:font-extrabold font-bold cursor-pointer text-[25px]">
              {"<"}
            </div>
            <div className=" text-black font-bold cursor-pointer text-[15px] flex items-center">
              {
                data[active]?.answer.length > 1  ?  `${shownAnswer+1} / ${data[active].answer.length}` : null
                
              }
            </div>
            <div  
            onClick={()=>{valueCheck(shownAnswer+1),setshownAnswer(shownAnswer+1)}}
            className="  text-gray-600 hover:text-black transition duration-300 ease-in-out hover:font-extrabold font-bold cursor-pointer text-[25px]">
              {">"}
            </div>
          </div> */}
          </div>

        )}
      </div>
    </div>
  );
};
Input.propTypes = {
  showResponse: PropTypes.bool.isRequired,
  setResponse: PropTypes.func.isRequired,
};

export default Input;
