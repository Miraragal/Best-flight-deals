import React, { useState, useEffect } from "react";
import {
  faArrowAltCircleRight,
  faArrowRight
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
import {Connections} from './ConnectionsFlights'


export const SortFlights = ({ flights}) => {
  
  const[data, setData]=useState([])
  const[currentSort, setCurrentSort]=useState('default')
 

  useEffect(() => {
    console.log("sorted");

    const sortArray = (e) => {
        const sortTypes = {
            cheapest: (a, b) => a.price.total - b.price.total,
            fastest: (a, b) =>
              parseFloat(
                a.itineraries[0].duration
                  .slice(2)
                  .replace("H", ".")
                  .replace("M", "")
                  .replace(/[^\d.-]/g, "")
              ) -
              parseFloat(
                b.itineraries[0].duration
                  .slice(2)
                  .replace("H", ".")
                  .replace("M", "")
                  .replace(/[^\d.-]/g, "")
              ),
            outboundStops: (a, b) =>
              a.itineraries[0].segments.length - b.itineraries[0].segments.length,
            returnStops: (a, b) =>
              a.itineraries[1].segments.length - b.itineraries[1].segments.length,
            outboundDepartureT: (a, b) =>
              a.itineraries[0].segments[0].departure.at -
              b.itineraries[0].segments[0].departure.at,
            returnDepartureT: (a, b) =>
              parseFloat(
                a.itineraries[1].segments[0].departure.at
                  .slice(11)
                  .replace(":", ".")
                  .replace(/[^\d.-]/g, "")
              ) -
              parseFloat(
                b.itineraries[1].segments[0].departure.at
                  .slice(11)
                  .replace(":", ".")
                  .replace(/[^\d.-]/g, "")
              ),
            default: (a, b) => a,
          };
        const sortProperty= sortTypes[e]
        const sorted= flights.sort(sortProperty)
        setData(sorted)
      };
    sortArray(currentSort)
  }, [currentSort]);






  return (
    <div className="render-fligths">
        Sort by{" "}
        <select onChange={(e) => setCurrentSort(e.target.value)}>
          <option value="default"></option>
          <option value="cheapest">Cheapest first</option>
          <option value="fastest">Fastest firts</option>
          <option value="outboundStops"> Outbound: Stops</option>
          <option value="returnStops"> Return: Stops</option>
          <option value="outboundDepartureT"> Outbound: Departure time</option>
          <option value="returnDepartureT"> Return: Departure time</option>
        </select>
      <ul>
        {flights.map((flight) => (
          <li key={flight.id}>
            <Card>
              <CardContent>
                <Button className="price-button" variant="contained">
                  Total cost: {flight.price.total}
                  {flight.price.currency}
                </Button>
                <Connections />
                <hr />
                <div className="itineraries">
                  {flight.itineraries.map((itinerary, index) => (
                    <li key={itinerary.id}>
                      <div className="trip">
                        <InputLabel>
                          {index === 0 ? "Outbound" : "Return"}
                        </InputLabel>{" "}
                        Duration:
                        {itinerary.duration.slice(
                          2,
                          itinerary.duration.length
                        )}{" "}
                        / Stops: {itinerary.segments.length}
                      </div>
                      <Accordion>
                        <AccordionSummary>
                          <Typography>
                            <div className="trip-details">
                              {itinerary.segments.map((segment) => (
                                <li key={segment.id}>
                                  <div className="departure-arrival">
                                    {" "}
                                    {segment.departure.iataCode}{" "}
                                    <FontAwesomeIcon
                                      icon={faArrowAltCircleRight}
                                    />{" "}
                                    {segment.arrival.iataCode} /{" "}
                                    {segment.duration.slice(
                                      2,
                                      segment.duration.length
                                    )}
                                  </div>
                                  <div className="departure-arrival">
                                    {" "}
                                    {segment.departure.at}{" "}
                                    <FontAwesomeIcon icon={faArrowRight} />{" "}
                                    {segment.arrival.at}
                                  </div>
                                </li>
                              ))}
                            </div>
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>
                            <div className="x">
                              {itinerary.segments.map((segment) => (
                                <li key={segment.id}>
                                  <div className="itinerary-details">
                                    {" "}
                                    Airport: {segment.departure.iataCode}{" "}
                                    Terminal: {segment.departure.terminal} Time:{" "}
                                    {segment.departure.at}{" "}
                                  </div>
                                  <hr />
                                  <div className="itinerary-details">
                                    {" "}
                                    Airport: {segment.arrival.iataCode}{" "}
                                    Terminal: {segment.arrival.terminal} Time:{" "}
                                    {segment.arrival.at}
                                  </div>
                                </li>
                              ))}
                            </div>
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                      <br />
                    </li>
                  ))}
                </div>
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
};
