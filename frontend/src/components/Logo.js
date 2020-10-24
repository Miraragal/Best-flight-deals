import React from "react";
import { faPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {Container } from "@material-ui/core";

const Logo = () => {
  return  <div >
      <Container className="headers">
      <h1>Where are you off to Next?</h1>
      <h2>Find the <span style={{color:'#f2bf5d'}}>perfect</span> match</h2>
      </Container>
    </div>
  
};

export default Logo;
