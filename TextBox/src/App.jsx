import React, { useEffect, useState } from 'react'
import Data from "./resources/countryData.json"

console.log(Data);

const App = () => {
  const [suggestionArr,setSuggestionArr] = useState([])
  const [input,setInput] = useState("")
  const [showSearch,setShowSearch] = useState(false)
  const handleSubmit = (e) =>{
    e.preventDefault()
    setInput("")
    setShowSearch(true)
  }
  useEffect(()=>{
    
    window.addEventListener('keydown',(e)=>{
      if(e.key=='Escape'){
        setSuggestionArr([])
        console.log("Escape");
      }
    });

    return ()=>{
      window.removeEventListener('keydown',(e)=>{
        if(e.key=='Escape'){
          setSuggestionArr([])
          console.log("Escape");
        }
      })
    }

  },[])

  const getSuggestion =(e)=>{
    let value = e.target.value
    setShowSearch(false)
    setInput(value)
    setSuggestionArr(Data.filter(e=>e.name.toLowerCase().startsWith(value.toLowerCase())))
  }

  return (
    <form onSubmit={(e)=>{handleSubmit(e)}}>
      <input type="text" placeholder='Enter Country' onChange={(e)=>{getSuggestion(e)}}/>
      <input type="submit" value="Search" />
      <div style={{display: `${input===""?"none":"flex"}`,flexDirection: "column",}}>{suggestionArr.map((e,i)=><p style={{marginBottom: "-1vw"}} key={i}>{e.name}</p>)}</div>
      <div style={{display: `${showSearch?"grid":"none"}`, gridTemplateColumns: "repeat(3,1fr)",gap: "1vw"}}>{suggestionArr.map((e,i)=><p style={{marginBottom: "-1vw",border: "1px solid black",textAlign:"center"}} key={i}>{e.name} - ({e.code})</p>)}</div>
    </form>
  )
}

export default App