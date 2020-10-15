import React, {useEffect } from "react";
import axios from "axios";
import { urlGetFlights } from "../data/config";
import { airportsInfo } from "../data/airports";
import IconButton from "@material-ui/core/IconButton";
import {faThumbtack} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {ConnectionRender} from './ConnectionDisplay'


export const Connections =({ flight, connections, from, to, departDate, returnDate, passenger, token})=>{

    let moreFlights1 = [];
    let moreFlights2 = [];
    

    useEffect(() => {
      console.log(`Connections Found:${connections}`);
      }, [connections]);

    
    const connectionSearch = async (iataCode) => {
        moreFlights1 = [];
        moreFlights2 = [];
    
        let originCode = [];
        airportsInfo.filter((e) =>
          e.LOCATION.toLowerCase().includes(from.toLowerCase()) ||
          e.AIRPORT_NAME.toLowerCase().includes(from.toLowerCase())
            ? originCode.push(e)
            : "Not found"
        );
    
        let destinationCode = [];
        airportsInfo.filter((e) =>
          e.LOCATION.toLowerCase().includes(to.toLowerCase()) ||
          e.AIRPORT_NAME.toLowerCase().includes(to.toLowerCase())
            ? destinationCode.push(e)
            : "Not found"
        );
    
        const connectionData1 = {
          originLocationCode: originCode[0].IATACODE, //string
          destinationLocationCode: iataCode, //string
          departureDate: departDate, //ISO 8601 YYYY-MM-DD
          returnDate: returnDate, //idem
          adults: passenger, // integer
          nonStop: true, //boolean
          max: 250, //integer (max number of flights offerts to return-default paramater)
        };
    
        const connectionData2 = {
          originLocationCode: iataCode, //string
          destinationLocationCode: destinationCode[1].IATACODE, //string
          departureDate: departDate, //ISO 8601 YYYY-MM-DD
          returnDate: returnDate, //idem
          adults: passenger, // integer
          nonStop: true, //boolean
          max: 250, //integer (max number of flights offerts to return-default paramater)
        };
        const urlParams1 = Object.keys(connectionData1)
          .map(function (key) {
            return key + "=" + connectionData1[key];
          })
          .join("&");
        const urlParams2 = Object.keys(connectionData2)
          .map(function (key) {
            return key + "=" + connectionData2[key];
          })
          .join("&");
    
        axios({
          methos: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          url: urlGetFlights + "?" + urlParams1,
        })
          .then((response) => {
            moreFlights1.push(response.data.data);
            console.log(moreFlights1);
          })
          .catch((error) => {
            console.log(error);
          });
    
        var millisecondsToWait = 100;
        setTimeout(function () {
          // Whatever you want to do after the wait
          axios({
            methos: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            url: urlGetFlights + "?" + urlParams2,
          })
            .then((response) => {
              moreFlights2.push(response.data.data);
              console.log(moreFlights2);
            })
            .catch((error) => {
              console.log(error);
            });
        }, millisecondsToWait);
      };

      
      return (
          <div className="connections-select">
                <IconButton 
                  onClick={() => console.log(flight.itineraries.map(x=> x.segments[0].arrival.iataCode))
                  }
                  >
                  <FontAwesomeIcon icon={faThumbtack} className="icon-button" />
                </IconButton>
                <ConnectionRender outboundConex={moreFlights1} returnConex={moreFlights2}/>
          </div>

      )

}

