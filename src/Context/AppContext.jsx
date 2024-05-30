// import { createContext, useState } from 'react'
// import {baseUrl} from '../baseUrl'

// export const AppContext =  createContext();
// // eslint-disable-next-line react/prop-types
// export default function AppContextProvider({children}){
//     const [loading, setLoding] =  useState(false)
//     const [posts,setPost] = useState([])
//     const [data,setData] = useState([])
//     const [curretnIndex, setIndex] = useState(0);
//     const [components, setComponet] = useState([""]);
//     const [disable,setDisable]=useState(false);
//     const [showEdit,setshowEdit]=useState(false);
//     function delayText(index, nextWord) {
//         setTimeout(function () {
//           if (index === 0) {
//             setPost(nextWord);
//           } else {
//             setPost((prev) => prev + nextWord);
//           }

//         //   console.log(posts);
//         }, 105 * index);
//       }



//       async function fetchData() {
//         setLoding(true);
//         let url = baseUrl;
//         const results = [];

//         let input = components.filter((component)=>{
//             // return !Array.isArray(component) || component.length > 0
//             return  component.length > 0 
//         })
//         console.log(input)
//         console.log 
//         try {
//             for (let i = 0; i < input.length; i++) {
//                 const result = await fetch(url, {
//                     method: "POST",
//                     headers: {
//                         "Accept": "application/json",
//                         "Content-Type": "application/json",
//                     },
//                     body: JSON.stringify({
//                         "persist_directory": "cybersecurity",
//                         "query": input[i],
//                         "hide_source": false,
//                         "mute_stream": false
//                     }),
//                 });

//                 if (!result.ok) {
//                     throw new Error('Network response was not ok ' + result.statusText);
//                 }

//                 const res = await result.json();
//                 const response = res.answer;

//                 setData(prevData => {
//                     const newData = [...prevData];
//                     newData[i] = {
//                         question: [...(newData[i]?.question || []), components[i]],
//                         answer: [...(newData[i]?.answer || []), response]
//                     };
//                     return newData;
//                 });

//                 const newResponse = response.split(' ');
//                 for (let j = 0; j < newResponse.length; j++) {
//                     const nextWord = newResponse[j];
//                     delayText(j, nextWord + " ");
//                 }

//                 results.push(response);
//             }
//         } catch (error) {
//             alert('Error in fetching, PLEASE TRY AGAIN');
//             console.log("Error in Fetching:", error);
//             setPost([]);
//         } finally {
//             setLoding(false);
//             setshowEdit(true)
//             console.log(data)
//         }

//         return results;
//     }

//     const value ={
//         posts,
//         setPost,
//         loading,
//         setLoding,
//         fetchData,
//         setData,
//         data,
//         curretnIndex, 
//         setIndex,
//         components,
//         setComponet,
//         disable,
//         setDisable,
//         showEdit,
//         setshowEdit
     
//     }

//     return <AppContext.Provider value={value}>
//         {children}
//     </AppContext.Provider>
// }
import { createContext, useState } from 'react'
import {baseUrl} from '../baseUrl'

export const AppContext =  createContext();
// eslint-disable-next-line react/prop-types
export default function AppContextProvider({children}){
    const [loading, setLoding] =  useState(false)
    const [posts,setPost] = useState([])
    const [data,setData] = useState([])
    const [curretnIndex, setIndex] = useState(0);
    const [components, setComponet] = useState([""]);
    const [disable,setDisable]=useState(false);
    const [showEdit,setshowEdit]=useState(false);
    function delayText(index, nextWord) {
        setTimeout(function () {
          if (index === 0) {
            setPost(nextWord);
          } else {
            setPost((prev) => prev + nextWord);
          }

        //   console.log(posts);
        }, 105 * index);
      }



      async function fetchData() {
        setLoding(true);
        let url = baseUrl;
        const results = [];

        let input = components.filter((component)=>{
            // return !Array.isArray(component) || component.length > 0
            return  component.length > 0 
        })
        let sentInput = input.filter((value)=>{
            return !data.some(item => item.question.includes(value));
        })
        console.log(input)
        console.log (sentInput)
        try {
            for (let i = 0; i < sentInput.length; i++) {
                const result = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        "persist_directory": "cybersecurity",
                        "query": sentInput[i],
                        "hide_source": false,
                        "mute_stream": false
                    }),
                });

                if (!result.ok) {
                    throw new Error('Network response was not ok ' + result.statusText);
                }

                const res = await result.json();
                const response = res.answer;
                const secondRes= res.question

                // setData(prevData => {
                //     const newData = [...prevData];
                //     newData[data.length] = {
                //         question: [...(newData[(data.length>i)?data.length:i]?.question || []), sentInput[i]],
                //         answer: [...(newData[(data.length>i)?data.length:i]?.answer || []), response]
                //     };
                //     return newData;
                // });
                setData(prevData => {
                    const newData = [...prevData, {
                        question: sentInput[i],
                        answer: response
                    }];
                    console.log("Updated Data inside setData:", newData);
                    return newData;
                })
console.log(curretnIndex)
                const newResponse = response.split(' ');
                for (let j = 0; j < newResponse.length; j++) {
                    const nextWord = newResponse[j];
                    delayText(j, nextWord + " ");
                }

                results.push(response);
            }
        } catch (error) {
            alert('Error in fetching, PLEASE TRY AGAIN');
            console.log("Error in Fetching:", error);
            setPost([]);
        } finally {
            setLoding(false);
            setshowEdit(true)
            console.log(data)
        }

        return results;
    }

    const value ={
        posts,
        setPost,
        loading,
        setLoding,
        fetchData,
        setData,
        data,
        curretnIndex, 
        setIndex,
        components,
        setComponet,
        disable,
        setDisable,
        showEdit,
        setshowEdit
     
    }

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}
