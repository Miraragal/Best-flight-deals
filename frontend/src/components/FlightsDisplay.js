import React, { useState, useEffect } from "react";
import { faPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  InputLabel,
  Container,
  TablePagination,
} from "@material-ui/core";
import { Connections } from "./ConnectionsFlights";


export const RenderFlights = ({
  flights,
  connections,
  from,
  to,
  departDate,
  returnDate,
  passenger,
  token,
}) => {
  const [data, setData] = useState([]);
  const [currentSort, setCurrentSort] = useState("cheapest");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);


  useEffect(() => {
    console.log(`Sort by:${currentSort}`);
    setData(currentSort);
    
  }, [currentSort]);

  const showIconPin = (value) => value > 1;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

 
  const handleSort = (e) => {
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
    };
    const sortProperty = sortTypes[e];
    const sorted = flights.sort(sortProperty)
    setCurrentSort(e)
  };
 

  return (
    <div>
      <Container style={{ flights }}>
        <div className="sort-fligths">
          {!(flights.length === 0) ? (
            <div className="icon-text">
              Sort by:{" "}
              <select onChange={(e) => handleSort(e.target.value)}>
                <option value="cheapest">Cheapest</option>
                <option value="fastest">Fastest</option>
                <option value="outboundStops"> Outbound: Stops</option>
                <option value="returnStops"> Return: Stops</option>
                <option value="outboundDepartureT">
                  {" "}
                  Outbound: Departure time
                </option>
                <option value="returnDepartureT">
                  {" "}
                  Return: Departure time
                </option>
              </select>
              <TablePagination
                rowsPerPageOptions={[5, 10, 15, 20]}
                count={flights.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </div>
          ) : null}
        </div>

        <div className="render-flights">
          <ul> 
          {flights.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((flight) => (
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

                      {flight.itineraries
                        .map((e) => e.segments.length)
                        .every(showIconPin) ? (
                        <h6 className="icon-text">
                          want more flights?
                          <Connections
                            flight={flight}
                            connections={connections}
                            from={from}
                            to={to}
                            departDate={departDate}
                            returnDate={returnDate}
                            passenger={passenger}
                            token={token}
                          />
                        </h6>
                      ) : null}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </div>
  );
};
