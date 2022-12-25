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
import { useState, useEffect} from "react";



function App() {
	const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
      if (window.innerWidth >= 1024) {
        setIsDesktop(true);
      } else {
        setIsDesktop(false);
      }
  }, []);


	return(
		<>
		{isDesktop && (
			<img src="/Screenshot 2022-12-25 at 8.41.22 PM.png" style={{
			 width: "420px",
position: "absolute",
left: "435px",
top: "0px"
			}}></img>
		  )}
		  <div className="desk-control">
			<BrowserRouter>
			  <Routes>
				<Route path="/" element={<Home />}></Route>
				<Route path="/input-page" element={<InputPage />}></Route>
				<Route path="/expand/:id" element={<View />}></Route>
			  </Routes>
			  <NavBar />
			</BrowserRouter>
		  </div>
		</>
	)

}

export default App 


