import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import { spacing } from '@mui/system';

function  NavBar() {
  const [colorSetting, settingSrt] = useState("#000000");
  const [colorAdd, AddSert] = useState("#D3D3D3");
  const [colorSett , SettSett] = useState("#D3D3D3")

  function change1() { 
    settingSrt("#000000");
    AddSert("#D3D3D3");
    SettSett("#D3D3D3");
  }

  function change2() {
    settingSrt("#D3D3D3");
    AddSert("#000000");
    SettSett("#D3D3D3");
  }

  function change3() {
    settingSrt("#D3D3D3");
    AddSert("#D3D3D3");
    SettSett("#000000");
  }

  const sxSame = {
  mx: 5
 }

 const sxOption ={
  mx: 8
 }

 const size = "30px"

  return (
    <>
      <div className="nav desk-nav">
     <Link to="/"><HomeRoundedIcon
          sx={sxSame}
          name="id"
          onClick={change1}
          style={{ color: `${colorSetting}` , fontSize:size }}
        /> </Link>
       <Link to="/input-page"><AddBoxRoundedIcon 
          sx={sxOption}
          onClick={change2} 
          style={{ color: `${colorAdd}`, fontSize:size}} 
        /> </Link>
       <Link to="/setting"><SettingsIcon 
            sx={sxSame}
            onClick={change3} 
          style={{color:`${colorSett}`,  fontSize:size}}
       /></Link>
    
      </div>
      <p>2022 © Rehan Shah</p>
      </>
  );
}

export default NavBar