import React, { useState, useEffect } from "react";
import axios, { Axios } from 'axios';
import { Link } from "react-router-dom";
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { spacing } from '@mui/system';

function ReactCard(props){
const [color , setColor] = useState(props.color);
const [count , setCount] = useState(props.count);
const[ widthPrec,setWidth ] = useState((count/props.times)*100 + "%");
const [widthFrac , setWidthF] = useState(props.count + "/" + props.times);
let id = props.id 
let  Exlink = "expand/"+id
const Element = "Add"



async function add(){
  setCount(count+1);
  setWidth((count/props.times)*100 + "%");
  setWidthF(count+1 + "/" + props.times);
  try{
      await axios.post( "http://localhost:4000/count" , {
     id ,
      Element
      })

  }catch(error){
    console.log(error);
  }
}

return (
    <div className="container"  >
        <div className="card" style={{width: "22.5rem", }} onClick={add}>
          <ul className="list-group">
            <li className="list-group-item"/>
              <div className="content">
              <table >
              <tbody>
                  <tr>
                      <td><h1>{props.Name}</h1></td>
                    
                      <td style={{width:"10%" , position:"relative",left:"10%" }} rowSpan="2" > <h3 style={{display:"inline-block"}}>{count}</h3> </td>
                     <Link to={Exlink}><td style={{position: "relative" , left: "90%"}}><ArrowForwardIosRoundedIcon
                        style={{color: "rgba(0, 0, 0, 0.75)"}}
                        sx={{mt:3 }}
                      /></td></Link>
                  </tr>
                  <tr>
                  <td ><h2>{props.repatation}: {widthFrac}</h2></td>
                  </tr>
                  </tbody>
              </table>
              </div>
              <div className="progress">
                <div className="progress-bar" role="progressbar" style={{width: `${widthPrec}`, backgroundColor: `${color}` }} aria-valuemin="0" aria-valuemax="100"></div>
              </div>
          </ul>
        </div>
  </div>
)
}

export default ReactCard ;

