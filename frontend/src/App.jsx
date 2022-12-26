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
import Setting from "./setting";
import { useState, useEffect} from "react";



function App() {


	return(
		<>
		  <div className="desk-control">
			<BrowserRouter>
			  <Routes>
				<Route path="/" element={<Home />}></Route>
				<Route path="/input-page" element={<InputPage />}></Route>
				<Route path="/expand/:id" element={<View />}></Route>
				<Route path="/setting" element={<Setting />}></Route>
			  </Routes>
			  <NavBar />
			</BrowserRouter>
		  </div>
		</>
	)

}

export default App 


