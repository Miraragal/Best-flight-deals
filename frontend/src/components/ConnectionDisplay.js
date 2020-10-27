import React, { useEffect,useState } from "react";
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
} from "@material-ui/core";

export const RenderConnections = ({ trip1, trip2 }) => {

  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [currentSortTrip1, setCurrentSortTrip1] = useState("cheapest");
  const [currentSortTrip2, setCurrentSortTrip2] = useState("cheapest");

  useEffect(() => {
    console.log("Trip1 Found:", trip1);
    console.log("Trip2 Found:", trip2);
    console.log(`Connection Sort by:${currentSortTrip1, currentSortTrip2}`);
      const sortArray = (e) => {
        const sortTypes = {
          cheapest: (a, b) => (a, b) => a,
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
        const sorted2 = trip2.sort(sortProperty);
        setData1(sorted1);
        setData2(sorted2);
      };
      sortArray(currentSortTrip1);
      sortArray(currentSortTrip2);
  }, [currentSortTrip1,currentSortTrip2]);




  const body1 = (
    <ul>
      <TableContainer className="split-table">
        <Table>
          <TableHead className='split-header'>
            <h3 style={{ textAlign: "center", marginBottom: "10"}}>
              Outbound Connections: &nbsp;
              {trip1[0].itineraries[0].segments[0].departure.iataCode}-
              {trip1[0].itineraries[0].segments[0].arrival.iataCode}
            </h3>
            <p style={{ fontSize: "10" }}>
              Sort by:
              <select className="split-sort" onChange={(e) => setCurrentSortTrip1(e.target.value)} >
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
            </p>
          </TableHead>
          <TableRow style={{marginBottom: "10"}}>
            {trip1.map((flight) => (
              <li key={flight.id} className="split-menu">
                {flight.itineraries.map((itinerary, index) => (
                  <li>
                    <TableCell className="split-cell" style={{marginTop: "10"}}>
                      <InputLabel style={{marginTop: "10"}}>
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

  const body2 = (
    <ul>
      <TableContainer className="split-table">
        <Table>
          <TableHead className='split-header'>
            <h3 style={{ textAlign: "center", marginBottom: "10" }}>
              Outbound Connections: &nbsp;
              {trip2[0].itineraries[0].segments[0].departure.iataCode}-
              {trip2[0].itineraries[0].segments[0].arrival.iataCode}
            </h3>
            <p style={{ fontSize: "10" }}>
              Sort by:
              <select className="split-sort" onChange={(e) => setCurrentSortTrip2(e.target.value)}>
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
            </p>
          </TableHead>
          <TableRow style={{marginBottom: "10"}}>
            {trip2.map((flight) => (
              <li key={flight.id} className="split-menu">
                {flight.itineraries.map((itinerary, index) => (
                  <li>
                    <TableCell className="split-cell" style={{marginTop: "10"}}>
                      <InputLabel style={{marginTop: "10"}}>
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
