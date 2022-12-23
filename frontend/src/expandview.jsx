import react,{useState,useEffect} from "react"
import axios from 'axios';
import { Bar } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    yAxes,
    scales,
    xAxes
  } from 'chart.js';
  import ChartDataLabels from 'chartjs-plugin-datalabels';
  import Chart from 'chart.js/auto';
  import { useParams } from "react-router-dom";
  import { Link } from "react-router-dom";



const black = "rgba(0, 0, 0, 0.75)"
let Element ="";
Chart.register(ChartDataLabels);

function ExpandView(props) {
//// varibles and const
let { id } = useParams();
let allItem ;
let Element ;
const [Increment , setIncrement] = useState([]);
const [count , setCount] = useState();
const [color , setColor] = useState();
const [title , setTitle] = useState();
const [description , setDesc] = useState();
const [history, setHistory] = useState([]);
const doneArray = [];

////The algo
  //changes the count
  async function updateSever(){
    try{
      await axios.post(  "http://localhost:4000/count" , {
      id ,
      Element
      })
  }catch(error){
    console.log(error);
  };
  }

  function add(){
  Element = "Add"
  setCount(count+1)
   updateSever();
  }

  async function sub(){
  Element = "sub"
  setCount(count-1);
  updateSever();
 }

 async function Delete(){
  try{
      await axios.post( "http://localhost:4000/delete" , {
       id
      })
  }catch(error){
    console.log(error);
  }
}

     
  //gets the item
useEffect(()=>{
  axios.get("http://localhost:4000/data").then(function(res){
    allItem = res.data;
    allItem.map((item) => {
     if(item._id == id){
      let x = item.count
       setCount(x);
       setColor(item.color);
       setTitle(item.Name);
       setHistory(item.completedHistory);
       setIncrement(item.Increment);
       setDesc(item.Description)
     }
   
   })
   });
})

let y = history.length 
doneArray.push(Math.floor(((history.filter(x => x===1).length)/y)*100));
doneArray.push(Math.floor(((history.filter(x => x===0).length)/y)*100));

//test
function x(){ 
console.log(doneArray);
}
 



  
/// chart ////
let data1 = {
  labels: ["Done","Left"],
  datasets: [
    {
      labels: [],
      backgroundColor: color,
      borderWidth: 1,
      borderRadius:10,
      stack: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.7)',
      data: doneArray
    }
  ]
}

const options1 = {
      plugins: {
          title: {
              display: false,
          },
          legend: {
            display: false
          }, 
          datalabels: {
            color: black
          }
  }}

  let data = {
    type: 'category',
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        data: Increment,
        fill: false,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: color,
        xAxisID:"x"
      }
    ]
  };

  const options2 = {
    plugins: {
        title: {
            display: true,
        },  
        legend: {
          display: false
       },
       datalabels: {
        color: black,
        anchor: 'end',
        align: 'end',
        offset: 0
      }},
    scales:{
      x: {
          display: false
      }
  }
}

///// html /////
    return (<div className="openView">
       <div className="top" style={{backgroundColor:`${color}`}}>
  
      <Link to="/"><img  className="close" src="/close.png"></img></Link>
        <h1 >{title}</h1> 
        <div className={"command"}>
        <img name="sub" onClick={sub} src="/sub.png"></img>
        <h2 >{count}</h2>
        <img name="add" onClick={add} src="/add.png"></img>
        </div>
        <p className="description">{description}</p>
        <Link to="/"><button type="button" className="btn btn-danger" onClick={Delete}>Delete</button></Link>
        </div>
       {/* infoo  */}
        <div className="info">
        <div style={{marginTop:"5%"}}><Bar data={data1} width={null} height={null} options={options1} />
        <h3 style={{textAlign:"center", color:{black}}}>Amount of task completed</h3>
        </div>
        <div style={{marginTop:"5%"}}> <Line data={data} options={options2}/>
        <h3 style={{textAlign:"center", color:{black}}}>Increment history</h3>
        </div>
        </div>
    </div> )
}

export default ExpandView;