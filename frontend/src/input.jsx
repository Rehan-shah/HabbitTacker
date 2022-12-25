import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import url from "./env.jsx"
console.log(url);
function InputPage(props){
  const [trackerProps , setTrackerProps] = useState({
    Name:"",
    repatation:"Daily",
    times:"",
    Description:"",
    color:"",
    Done:"false",
    count:0,
    Increment:[],
    completedHistory:[0,1]
});


  
useEffect(()=>{
  colorSelector();
},[])

function handleChnage(event){
 
 const {name,value} = event.target;

  setTrackerProps((prevValue)=>{
    return{
      ...prevValue,
      [name] : value
    }

  })};

  
  function changeBackground(event) {
    const button = event.target;
    const buttons = button.parentElement.querySelectorAll('button');
    buttons.forEach((btn) => {
      if (btn === button) {
        btn.setAttribute('style', 'background-color: rgb(233, 233, 233)');
      } else {
        btn.setAttribute('style', 'background-color: transparent');
      }
    });
    handleChnage(event);
  }
  
  function colorSelector(){
		const colorList = ["#f86263","#f9c51b","#2396d2","#bfe251","#d589dd","#f86263","#426093","#27baa6","#4ad0e1","#6ed0bb"];
		let selectedColor = Math.floor((Math.random()*colorList.length)+1);
	   setTrackerProps((prevValue)=>{
       return{
        ...prevValue,
       color:colorList[selectedColor]
    }
  })
}


async function save(){

  console.log(trackerProps);
  try{
      await axios.post( url+"/input" , {
        trackerProps
      })
  }catch(error){
    console.log(error);
  }
}



  return (
    <div className="Allbody">
  <form onSubmit={(event)=> {event.preventDefault()}}>
   <div>
      <h1 style={{display:"inline"}}>CREATE</h1>
     <Link to="/"><button type="submit" className="s-button" onClick={save}  style={{display:"inline"}} name="button">SAVE</button></Link>
    </div>
    <div className="form-floating mb-3">
      <input type="text" className="form-control" id="floatingInput" name="Name" onChange= {handleChnage} placeholder="name@example.com"  />
      <label htmlFor="floatingInput"  >Name</label>
    </div>
    <div className="">
      <h2>CHOOSE A GOAL PERIOD:</h2>
      <button style={{backgroundColor: "rgb(233, 233, 233)"}} type="button" name="repatation" value="Daily" className="i-button"  onClick={ changeBackground }>DAILY</button>
      <button style={{backgroundColor: ""}} type="button"  name="repatation" value="Weekly" className="i-button"  onClick={ changeBackground }>WEEKLY</button>
      <button style={{backgroundColor: ""}}type="button"   name="repatation" value="Monthly" className="i-button"  onClick={changeBackground}>MONTHLY</button>
      <button style={{backgroundColor: ""}} type="button"   name="repatation" value="Yearly" className="i-button"  onClick={changeBackground}>YEARLY</button>
    </div>
    <div>
        <h2>SET YOUR GOAL</h2>
          <input name="times" onChange={handleChnage} style={{display:"inline", width:"20%" , backgroundColor: "rgb(233, 233, 233)"}}
          type="number" className="form-control num" aria-describedby="inputGroup-sizing-sm" placeholder="5" />
     <h3 style={{display:"inline"}}>TIMES</h3>
    </div>
    <div >
      <h2>Description</h2>
      <textarea type="text" name="Description"  onChange={handleChnage} className="form-control" style={{backgroundColor: "rgb(233, 233, 233)", fontSize:"0.85rem"}} rows="3" ></textarea>
    </div>
</form>
</div>)

}

export default InputPage ;