import React, { useState, useEffect } from "react";
import {
  faArrowAltCircleRight,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  InputLabel,
} from "@material-ui/core";

export const RenderConnections = ({ trip1, trip2 }) => {

   useEffect(() => {
 
      console.log("Trip1 Found:", trip1);
      console.log("Trip2 Found:", trip2);
      
    
    return () => {
      //
    };
    }, [trip1,trip2]);
  
  return (
    <div className="connection-render">
      <ul>
       {console.log()}
      </ul>
  </div>
  
  );
};
