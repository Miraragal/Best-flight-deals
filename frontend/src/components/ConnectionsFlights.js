import React, { useEffect, useState } from "react";
import axios from "axios";
import { urlGetFlights } from "../data/config";
import { airportsInfo } from "../data/airports";
import { RenderConnections } from "./ConnectionDisplay";
import { Button } from "@material-ui/core";

export const Connections = ({
  flight,
  connections,
  from,
  to,
  departDate,
  returnDate,
  passenger,
  token,
}) => {
  const [trip1, setTrip1] = useState();
  const [trip2, setTrip2] = useState();
  const [isActive, setIsActive] = useState(false);



  useEffect(() => {
    if (connections.length > 0) {
      console.log(`Connections Found:${connections}`);
    }
  }, [connections]);

  //Searching for independents flights connections
  const connectionSearch = async (iataCode) => {
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
        setTrip1(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });

    var millisecondsToWait = 120;
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
          setTrip2(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }, millisecondsToWait);
  };

  const handleShow = () => setIsActive(!isActive);

  return (
    <div>
      <Button
        className="split-button"
        onClick={() => {
          connectionSearch(
            flight.itineraries
              .map((x) => x.segments[0].arrival.iataCode)
              .reduce((a, b) => (a.includes(b) ? a : [a, b]))
          );
          handleShow();
        }}
      >
        {isActive ? "Hide split flight" : "Show split flight"}
      </Button>

      {isActive && (
        <div>
          {trip1 && trip2 ? (
            <RenderConnections  trip1={trip1} trip2={trip2} />
            ) : null}
        </div>
      )}
     
    </div>
  );
};
