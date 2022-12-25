import React from "react";
import InputPage from "./input";
import {
	BrowserRouter ,
	Switch,
	Route,
	Routes,
	Link,
	useParams
  } from "react-router-dom";
import NavBar from "./navbar";
import Card from "./card";
import Home from "./Home";
import View from "./expandview";



function App() {
	let obj = {
		Name:"",
		repatation:"Daily",
		times:"",
		Description:"",
		color:"",
		Done:"false",
		count:0,
		Increment:[],
		completedHistory:[],
	}

	return(

		<div width="500px">
        <BrowserRouter>
		<Routes>
		<Route path="/" element={<Home />}></Route>
	    <Route path="input-page" element={<InputPage object={obj} />}></Route>
		<Route path="/expand/:id" element={<View />}></Route>
		</Routes>
		<NavBar/>
		</BrowserRouter> 
		</div>
	)
}

export default App 


