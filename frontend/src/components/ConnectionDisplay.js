import React, { useState, useEffect } from "react";
import { faPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Container, InputLabel, Modal } from "@material-ui/core";


export const RenderConnections = ({ trip1, trip2 }) => {
  useEffect(() => {
    console.log("Trip1 Found:", trip1);
    console.log("Trip2 Found:", trip2);
  }, [trip1, trip2]);

  const body1 = (
    <ul>
      {trip1.map((flight) => (
        <li key={flight.id}>
          <div className="card">
            <div className="container">
              {flight.itineraries.map((itinerary, index) => (
                <li>
                  <div className="itineraries">
                    <InputLabel>
                      {index === 0 ? <h4>Outbound</h4> : <h4>Return</h4>}
                    </InputLabel>
                    <h5>
                      Duration:
                      {itinerary.duration
                        .slice(2, itinerary.duration.length)
                        .replace("H", "h")
                        .replace("M", "")}
                      &nbsp;Stops:{itinerary.segments.length}
                    </h5>
                    <div className="trip-body">
                      {itinerary.segments.map((segment) => (
                        <li key={segment.id}>
                          <div className="part1">
                            {/* horas */}
                            {segment.departure.at.slice(11, 16)}h&nbsp;
                            {segment.arrival.at.slice(11, 16)}h
                          </div>
                          {/* icon */}
                          <div className="part2">
                            <FontAwesomeIcon
                              icon={faPlane}
                              style={{
                                color: "#F2BF5D",
                                justifyItems: "center",
                              }}
                            />
                            &nbsp;
                            {/* duration */}
                            {segment.duration
                              .slice(2, segment.duration.length)
                              .replace("H", "h")
                              .replace("M", "")}
                          </div>
                          <div className="part3">
                            {/* airports */}
                            {segment.departure.iataCode}&nbsp;
                            {segment.arrival.iataCode}
                          </div>
                          <br />
                        </li>
                      ))}
                    </div>
                  </div>
                </li>
              ))}
              <div className="item">
                <h3>
                  {flight.price.total}
                  {flight.price.currency}
                </h3>
                <Button className="select-button" variant="contained">
                  Select
                </Button>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );

  const body2 = (
    <ul>
      {trip2.map((flight) => (
        <li key={flight.id}>
          <div className="card">
            <div className="container">
              {flight.itineraries.map((itinerary, index) => (
                <li>
                  <div className="itineraries">
                    <InputLabel>
                      {index === 0 ? <h4>Outbound</h4> : <h4>Return</h4>}
                    </InputLabel>
                    <h5>
                      Duration:
                      {itinerary.duration
                        .slice(2, itinerary.duration.length)
                        .replace("H", "h")
                        .replace("M", "")}
                      &nbsp;Stops:{itinerary.segments.length}
                    </h5>
                    <div className="trip-body">
                      {itinerary.segments.map((segment) => (
                        <li key={segment.id}>
                          <div className="part1">
                            {/* horas */}
                            {segment.departure.at.slice(11, 16)}h&nbsp;
                            {segment.arrival.at.slice(11, 16)}h
                          </div>
                          {/* icon */}
                          <div className="part2">
                            <FontAwesomeIcon
                              icon={faPlane}
                              style={{
                                color: "#F2BF5D",
                                justifyItems: "center",
                              }}
                            />
                            &nbsp;
                            {/* duration */}
                            {segment.duration
                              .slice(2, segment.duration.length)
                              .replace("H", "h")
                              .replace("M", "")}
                          </div>
                          <div className="part3">
                            {/* airports */}
                            {segment.departure.iataCode}&nbsp;
                            {segment.arrival.iataCode}
                          </div>
                          <br />
                        </li>
                      ))}
                    </div>
                  </div>
                </li>
              ))}
              <div className="item">
                <h3>
                  {flight.price.total}
                  {flight.price.currency}
                </h3>
                <Button className="select-button" variant="contained">
                  Select
                </Button>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );


  return (
    <div>
      <Container>
        {body1}  {body2}
      
      </Container>
    </div>
  );
};
