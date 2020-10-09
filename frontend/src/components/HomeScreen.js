import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import IconButton from "@material-ui/core/IconButton";
import {
  faArrowAltCircleRight,
  faArrowRight,
  faHeartbeat,
  faPlaneArrival,
  faPlaneDeparture,
  faSearch,
  faThumbtack,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  FormControl,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  InputLabel,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { getToken } from "../data/auth";
import axios from "axios";
import { airportsInfo } from "../data/airports";
import { urlGetFlights } from "../data/config";

function SearchScreen(props) {
  //1-setting props in our state
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [token, setToken] = useState("");
  const [departDate, setDepartDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());
  const [passenger, setPassenger] = useState(1);
  const [flights, setFlights] = useState([]);
  const [connections, setConnections] = useState([]);
  let moreFlights1 = [];
  let moreFlights2 = [];

  //We call componentDiMount
  useEffect(() => {
    console.log("update");
    myToken();
    findConnections();
  }, [flights]);

  //To unwrap the promise. We define an async function that will be called when declared searchHandler
  const myToken = async () => {
    try {
      setToken(await getToken());
      //Await for the getToken() to complete and declare the result in the vble token
    } catch (err) {
      console.log("Error: " + err);
    }
  };

  const searchHandler = async (input) => {
    input.preventDefault();
    console.log(
      "Searching: " +
        from +
        " " +
        to +
        "/" +
        departDate +
        "/" +
        returnDate +
        "/ Passengers:" +
        passenger +
        "/ Token:" +
        token
    );

    let originCode = [];
    console.log(originCode);
    airportsInfo.filter((e) =>
      e.LOCATION.toLowerCase().includes(from.toLowerCase()) ||
      e.AIRPORT_NAME.toLowerCase().includes(from.toLowerCase())
        ? originCode.push(e)
        : "Not found"
    );

    let destinationCode = [];
    console.log(destinationCode);
    airportsInfo.filter((e) =>
      e.LOCATION.toLowerCase().includes(to.toLowerCase()) ||
      e.AIRPORT_NAME.toLowerCase().includes(to.toLowerCase())
        ? destinationCode.push(e)
        : "Not found"
    );

    const Flightdata = {
      originLocationCode: originCode[0].IATACODE, //string
      destinationLocationCode: destinationCode[1].IATACODE, //string
      departureDate: departDate, //ISO 8601 YYYY-MM-DD
      returnDate: returnDate, //idem
      adults: passenger, // integer
      nonStop: false, //boolean
      max: 250, //integer (max number of flights offerts to return-default paramater)
    };

    const urlParams = Object.keys(Flightdata)
      .map(function (key) {
        return key + "=" + Flightdata[key];
      })
      .join("&");

    //Token to be sent to the GEST request:
    axios({
      methos: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      url: urlGetFlights + "?" + urlParams,
    })
      .then((response) => {
        setFlights(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const findConnections = () => {
    let stops = new Set();
    flights.map((flight) =>
      flight.itineraries[0].segments.length === 2
        ? stops.add(flight.itineraries[0].segments[0].arrival.iataCode)
        : "No connections flight"
    );
    setConnections([...stops]);
    console.log([...stops]);
  };

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
    <div className="searchbox">
      <form onSubmit={searchHandler}>
        <ul className="form-container">
          <li>
            <label htmlFor="from">
              <h3>From:</h3>
            </label>
            <FormControl variant="outlined" className="formControl">
              <OutlinedInput
                id="departure"
                value={from}
                placeholder="Enter city or airport"
                onChange={(input) => setFrom(input.target.value)}
                startAdornment={
                  <InputAdornment position="start">
                    {" "}
                    <FontAwesomeIcon icon={faPlaneDeparture} />
                  </InputAdornment>
                }
              />
            </FormControl>{" "}
            <TextField
              id="date"
              label="Depart"
              type="date"
              defaultValue=""
              className="textField"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(input) => setDepartDate(input.target.value)}
            />
          </li>

          <li>
            <label htmlFor="to">
              <h3>To:</h3>
            </label>
            <FormControl variant="outlined" className="formControl">
              <OutlinedInput
                id="return"
                value={to}
                placeholder="Enter city or airport"
                onChange={(input) => setTo(input.target.value)}
                startAdornment={
                  <InputAdornment position="start">
                    {" "}
                    <FontAwesomeIcon icon={faPlaneArrival} />
                  </InputAdornment>
                }
              />
            </FormControl>{" "}
            <TextField
              id="date"
              label="Return"
              type="date"
              defaultValue=""
              className="textField"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(input) => setReturnDate(input.target.value)}
            />
          </li>

          <li>
            <label htmlFor="passenger">
              <h5>Number of Passenger:</h5>
            </label>
            <Select
              className="selectControl"
              fullWidth
              value={passenger}
              onChange={(input) => setPassenger(input.target.value)}
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
            </Select>
          </li>

          <li>
            <Button type="search" variant="contained" className="search-button">
              <FontAwesomeIcon icon={faSearch} />
              Search
            </Button>
          </li>
          {""}
          <li>
            <Link to="/favorites">
              <IconButton>
                <FontAwesomeIcon icon={faHeartbeat} className="icon-button" />
              </IconButton>
            </Link>
          </li>
        </ul>
      </form>

      <ul className="flights">
        {flights.map((flight) => (
          <li key={flight.id}>
            <Card>
              <CardContent>
                <Button className="price-button" variant="contained">
                  Total cost: {flight.price.total}
                  {flight.price.currency}
                </Button>
                <IconButton
                  onClick={() =>
                    connectionSearch(
                      flight.itineraries[0].segments[0].arrival.iataCode
                    )
                  }
                >
                  <FontAwesomeIcon icon={faThumbtack} className="icon-button" />
                </IconButton>
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
}

export default SearchScreen;
