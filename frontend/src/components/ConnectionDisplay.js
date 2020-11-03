import React, { useEffect, useState } from "react";
import { faPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  InputLabel,
  TableCell,
  Table,
  TableContainer,
  TableRow,
  TableHead,
  Container,
  TablePagination,
} from "@material-ui/core";


export const RenderConnections = ({ trip1, trip2 }) => {
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [currentSortTrip1, setCurrentSortTrip1] = useState("cheapest");
  const [currentSortTrip2, setCurrentSortTrip2] = useState("cheapest");
  const [pageTrip1, setPageTrip1] = useState(0);
  const [pageTrip2, setPageTrip2] = useState(0);
  const [rowsPerPageTrip1, setRowsPerPageTrip1] = useState(2);
  const [rowsPerPageTrip2, setRowsPerPageTrip2] = useState(2);
 

  useEffect(() => {
    console.log("Trip1 Found:", trip1);
    console.log("Trip2 Found:", trip2);
    console.log(`Connection 2 Sort by:${currentSortTrip2}`);
    setData1(currentSortTrip1);
    console.log(`Connection 1 Sort by:${currentSortTrip1}`);
    setData2(currentSortTrip2);
  }, [currentSortTrip1, currentSortTrip2]);



  // SPLIT - FIRST CONNECTION //
  const handleSortTrip1 = (e) => {
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
    const sorted1 = trip1.sort(sortProperty);
    setCurrentSortTrip1(e);
  };
  const handleChangePageTrip1 = (event, newPage) => {
    setPageTrip1(newPage);
  };
  const handleChangeRowsPerPageTrip1 = (event) => {
    setRowsPerPageTrip1(parseInt(event.target.value, 10));
    setPageTrip1(1);
  };
  const body1 = (
    <ul>
      <TableContainer className="split-table">
        <Table>
          <TableHead className="split-header">
            <h3 style={{ textAlign: "center", marginBottom: "10" }}>
              Outbound Connections: &nbsp;
              {trip1[0].itineraries[0].segments[0].departure.iataCode}-
              {trip1[0].itineraries[0].segments[0].arrival.iataCode}
            </h3>
            <p style={{ fontSize: "10" }}>
              Sort by:
              <select
                className="split-sort"
                onChange={(e) => handleSortTrip1(e.target.value)}
              >
                <option value="cheapest">Cheapest</option>
                <option value="fastest">Fastest</option>
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
                className="split-rows"
                rowsPerPageOptions={[2, 4, 8, 16]}
                count={trip1.length}
                rowsPerPage={rowsPerPageTrip1}
                page={pageTrip1}
                onChangePage={handleChangePageTrip1}
                onChangeRowsPerPage={handleChangeRowsPerPageTrip1}
              />
            </p>
          </TableHead>
          <TableRow style={{ marginBottom: "10" }}>
            {trip1
              .slice(
                pageTrip1 * rowsPerPageTrip1,
                pageTrip1 * rowsPerPageTrip1 + rowsPerPageTrip1
              )
              .map((flight) => (
                <li key={flight.id} className="split-menu">
                  {flight.itineraries.map((itinerary, index) => (
                    <li>
                      <TableCell
                        className="split-cell"
                        style={{ marginTop: "10" }}
                      >
                        <InputLabel style={{ marginTop: "10" }}>
                          {index === 0 ? (
                            <h4 style={{ textAlign: "left" }}>Outbound</h4>
                          ) : (
                            <h4 style={{ textAlign: "left" }}>Return</h4>
                          )}
                        </InputLabel>
                        <p style={{ fontSize: "10px" }}>
                          Duration:
                          {itinerary.duration
                            .slice(2, itinerary.duration.length)
                            .replace("H", "h")
                            .replace("M", "")}
                          &nbsp;Stops:{itinerary.segments.length}
                        </p>

                        {itinerary.segments.map((segment) => (
                          <li key={segment.id} style={{ textAlign: "center" }}>
                            {/* horas */}
                            {segment.departure.at.slice(11, 16)}h&nbsp;&nbsp;
                            {segment.arrival.at.slice(11, 16)}h
                            <br />
                            {/* icon */}
                            <FontAwesomeIcon
                              icon={faPlane}
                              style={{
                                color: "#F2BF5D",
                                justifyItems: "center",
                              }}
                            />
                            {/* duration */}
                            {segment.duration
                              .slice(2, segment.duration.length)
                              .replace("H", "h")
                              .replace("M", "")}
                            <br />
                            {/* airports */}
                            {segment.departure.iataCode}&nbsp;&nbsp;
                            {segment.arrival.iataCode}
                            <br />
                          </li>
                        ))}
                      </TableCell>
                    </li>
                  ))}
                  <TableCell>
                    <Button
                      className="split-select"
                      variant="contained"
                      style={{ justifyitem: "center" }}
                    >
                      {flight.price.total}
                      {flight.price.currency}
                      <br />
                      Select
                    </Button>
                  </TableCell>
                </li>
              ))}
          </TableRow>
        </Table>
      </TableContainer>
    </ul>
  );
  // SPLIT - SECOND CONNECTION //
  const handleSortTrip2 = (e) => {
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
    const sorted2 = trip2.sort(sortProperty);
    setCurrentSortTrip2(e);
  };
  const handleChangePageTrip2 = (event, newPage) => {
    setPageTrip2(newPage);
  };

  const handleChangeRowsPerPageTrip2 = (event) => {
    setRowsPerPageTrip2(parseInt(event.target.value, 10));
    setPageTrip2(1);
  };

  const body2 = (
    <ul>
      <TableContainer className="split-table">
        <Table>
          <TableHead className="split-header">
            <h3 style={{ textAlign: "center", marginBottom: "10" }}>
              Outbound Connections: &nbsp;
              {trip2[0].itineraries[0].segments[0].departure.iataCode}-
              {trip2[0].itineraries[0].segments[0].arrival.iataCode}
            </h3>
            <p style={{ fontSize: "10" }}>
              Sort by:
              <select
                className="split-sort"
                onChange={(e) => handleSortTrip2(e.target.value)}
              >
                <option value="cheapest">Cheapest</option>
                <option value="fastest">Fastest</option>
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
                className="split-rows"
                rowsPerPageOptions={[2, 4, 8, 16]}
                count={trip2.length}
                rowsPerPage={rowsPerPageTrip2}
                page={pageTrip2}
                onChangePage={handleChangePageTrip2}
                onChangeRowsPerPage={handleChangeRowsPerPageTrip2}
              />
            </p>
          </TableHead>
          <TableRow style={{ marginBottom: "10" }}>
            {trip2
              .slice(
                pageTrip2 * rowsPerPageTrip2,
                pageTrip2 * rowsPerPageTrip2 + rowsPerPageTrip2
              )
              .map((flight) => (
                <li key={flight.id} className="split-menu">
                  {flight.itineraries.map((itinerary, index) => (
                    <li>
                      <TableCell
                        className="split-cell"
                        style={{ marginTop: "10" }}
                      >
                        <InputLabel style={{ marginTop: "10" }}>
                          {index === 0 ? (
                            <h4 style={{ textAlign: "left" }}>Outbound</h4>
                          ) : (
                            <h4 style={{ textAlign: "left" }}>Return</h4>
                          )}
                        </InputLabel>
                        <p style={{ fontSize: "10px" }}>
                          Duration:
                          {itinerary.duration
                            .slice(2, itinerary.duration.length)
                            .replace("H", "h")
                            .replace("M", "")}
                          &nbsp;Stops:{itinerary.segments.length}
                        </p>

                        {itinerary.segments.map((segment) => (
                          <li key={segment.id} style={{ textAlign: "center" }}>
                            {/* horas */}
                            {segment.departure.at.slice(11, 16)}h&nbsp;&nbsp;
                            {segment.arrival.at.slice(11, 16)}h
                            <br />
                            {/* icon */}
                            <FontAwesomeIcon
                              icon={faPlane}
                              style={{
                                color: "#F2BF5D",
                                justifyItems: "center",
                              }}
                            />
                            {/* duration */}
                            {segment.duration
                              .slice(2, segment.duration.length)
                              .replace("H", "h")
                              .replace("M", "")}
                            <br />
                            {/* airports */}
                            {segment.departure.iataCode}&nbsp;&nbsp;
                            {segment.arrival.iataCode}
                            <br />
                          </li>
                        ))}
                      </TableCell>
                    </li>
                  ))}
                  <TableCell>
                    <Button
                      className="split-select"
                      variant="contained"
                      style={{ justifyitem: "center" }}
                    >
                      {flight.price.total}
                      {flight.price.currency}
                      <br />
                      Select
                    </Button>
                  </TableCell>
                </li>
              ))}
          </TableRow>
        </Table>
      </TableContainer>
    </ul>
  );

  return (
    <div className="split-container">
          <ul className="split-menu">
            <li>{body1}</li>
            <li>{body2}</li>
          </ul>
    </div>
  );
};
