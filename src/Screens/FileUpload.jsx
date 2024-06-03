import { useState,useContext } from "react";
import { AppContext } from '../Context/AppContext'
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import { uploadUrl } from "../baseUrl";
import { useNavigate } from 'react-router-dom';
const FileUpload = () => {
    const {folder, setFolder}=useContext(AppContext)
  const [files, setFiles] = useState([]);
 

  const navigate = useNavigate();

  function deleteFile(i){
    let newFiles = [...files];
    newFiles.splice(i, 1); 
    setFiles(newFiles);
  }
  
  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;

    console.log(event.dataTransfer.files[0].name);

    const allPDF = Array.from(droppedFiles).every(
      (file) => file.type === "application/pdf"
    );

    if (allPDF) {
        const newFiles = Array.from(droppedFiles).filter((file) => 
            !files.some((f) => f.name === file.name)
          );
      

          const updatedList = [...files, ...newFiles];
          console.log(updatedList)
          console.log(updatedList[0].name)
          setFiles(updatedList);
 
    } else {
      alert("Please drop only PDF files.");
    }
  };

  const handleUpload = async () => {
    if (!files) {
        alert("No files to upload");
        return;
    }

    const formData = new FormData();
    Array.from(files).forEach((file) => {
        formData.append('files', file);
    });
console.log(formData)
    try {
        const uploadUrlWithParams = `${uploadUrl}?upload_subdir=${folder}`
        const response = await fetch(uploadUrlWithParams, {
            method: 'POST',
            headers: {
                "Accept": "application/json",
            //    " Content-Type": "multipart/form-data"
            },
            body: 
                formData,
        });

        if (response.ok) {
            console.log(response)
            alert('Files uploaded successfully');
            navigate("/ai")
        } else {
            alert('Failed to upload files');
        }
    } catch (error) {
        console.error('Error uploading files:', error);
        alert('An error occurred while uploading files');
    }
};



  return (
    <div className="min-h-screen h-full flex border border-[white] items-center justify-around flex-col rounded-md">

      <div className=" w-[90%] h-full items-center flex-row flex justify-between">
        <div className=" rounded-2xl w-[45%] p-20 bg-white flex justify-center items-center h-full">
          <div
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event)=>handleDrop(event)}
            className="w-full h-full rounded-2xl py-8 bg-slate-200  gap-4 border-2 border-dashed border-blue-400 flex-col flex justify-center items-center"
          >
            <div className="h-[200px] w-[200px]">
              <img src="../../public/cloud-upload-regular-240.png" alt="" />
            </div>
            <p className="text-gray-700">Drag and drop PDF file here</p>
            {/* <Button variant="contained" onClick={() => setOpen(false)}>close</Button> */}
          </div>
        </div>
        <div className="bg-white rounded-2xl p-10 flex justify-center flex-col items-center gap-8 ">
          <div className="flex justify-center w-[70%]">
            <TextField
              id="filled-password-input"
              label="Content Name"
              onChange={(e)=>{setFolder(e.target.value)}}
              autoComplete="current-password"
              variant="standard"
              sx={{ backgroundColor: "white" , width:"100%"}}
            />
          </div>
          
          {
            files.length===0 ? 
            <div className="flex bg-slate-200 rounded-xl justify-center items-center flex-row w-[380px] h-full py-[6px] px-2">
            <div className=" flex justify-center items-center bg-slate-200  w-full h-full">
              <img className="w-[40px] h-[40px]" src="../../public/file-pdf-solid-240.png" alt="pdf" />
              <div className="flex w-full h-full justify-center items-center">
              <p className=" text-base font-[500] text-[black]">Lets upload some files</p>
            </div>
            </div>

          </div>
          :
          files.map((file,i)=>(
          <div key={i} className="flex bg-slate-200 rounded-xl justify-between flex-row w-[380px] h-full py-[6px] px-2">
          <div className=" flex bg-slate-200 gap-3 flex-row w-full h-full">
            <img className="w-[40px] h-[40px]" src="../../public/file-pdf-solid-240.png" alt="pdf" />
            <div>
            <p>{file.name}</p>
            <p className=" text-sm font-[500] text-[black]">{(file.size / 1024).toFixed(2)} KB</p>
          </div>
          </div>
          <div onClick={(i)=> deleteFile(i)} className=" text-gray-600 pl-1 hover:text-black transition duration-300 ease-in-out hover:font-extrabold font-bold cursor-pointer text-[25px]">
           ×
          </div>
        </div>
          ))}

        </div>
      </div>

      <div className=' w-[90%] h-full flex flex-row  gap-3 justify-end items-end' >

        <div className=' h-full flex' >
            <Button onClick={()=>{(files.length===0) ? null:handleUpload()}} disabled={(!(files.length===0 || folder.length === 0)?false:true)}  variant="contained">Next</Button>
        </div>
    </div>
    </div>
  );
};

export default FileUpload;
