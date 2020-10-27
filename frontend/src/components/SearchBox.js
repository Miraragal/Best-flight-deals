import React, { useState, useEffect, useRef } from "react";
import {
  faHeart,
  faPlaneArrival,
  faPlaneDeparture,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  FormControlLabel,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  RadioGroup,
  Select,
  IconButton,
  Radio,
  FormControl,
  Grid,
  Container,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { getToken } from "../data/auth";
import axios from "axios";
import { airportsInfo } from "../data/airports";
import { urlGetFlights } from "../data/config";
import { RenderFlights } from "./FlightsDisplay";
import { RenderConnections } from "./ConnectionDisplay";


function SearchBox() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [returnInput, setReturnInput] = useState(false);
  const [token, setToken] = useState("");
  const [departDate, setDepartDate] = useState();
  const [returnDate, setReturnDate] = useState();
  const [passenger, setPassenger] = useState(1);
  const [flights, setFlights] = useState([]);
  const [connections, setConnections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let myFlights = useRef();

  //We call componentDiMount
  useEffect(() => {
    myToken();
    findConnections();
    if (myFlights.current) {
      window.scrollTo({
        behavior: "smooth",
        top: myFlights.current.offsetTop,
      });
    }
  }, [isLoading, flights]);

  //To unwrap the promise. We define an async function that will be called when declared searchHandler
  const myToken = async () => {
    try {
      setToken(await getToken());
      //Await for the getToken() to complete and declare the result in the vble token
    } catch (err) {
      console.log("Error: " + err);
    }
  };

  //InputBox Handler
  const inputHandler = () => {
    setReturnInput(!returnInput);
  };

  //Search Selection
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

    const FlightdataRoundtrip = {
      originLocationCode: originCode[0].IATACODE, //string
      destinationLocationCode: destinationCode[1].IATACODE, //string
      departureDate: departDate, //ISO 8601 YYYY-MM-DD
      returnDate: returnDate, //idem
      adults: passenger, // integer
      nonStop: false, //boolean
      max: 250, //integer (max number of flights offerts to return-default paramater)
    };

    const FlightdataOne = {
      originLocationCode: originCode[0].IATACODE, //string
      destinationLocationCode: destinationCode[1].IATACODE, //string
      departureDate: departDate, //ISO 8601 YYYY-MM-DD
      adults: passenger, // integer
      nonStop: false, //boolean
      max: 250, //integer (max number of flights offerts to return-default paramater)
    };

    const urlParams =
      returnDate !== undefined
        ? Object.keys(FlightdataRoundtrip)
            .map(function (key) {
              return key + "=" + FlightdataRoundtrip[key];
            })
            .join("&")
        : Object.keys(FlightdataOne)
            .map(function (key) {
              return key + "=" + FlightdataOne[key];
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

  //Connections for Search Selection
  const findConnections = () => {
    let stops = new Set();
    flights.map((flight) =>
      flight.itineraries[0].segments.length === 2
        ? stops.add(flight.itineraries[0].segments[0].arrival.iataCode)
        : "No connections flight"
    );
    setConnections([...stops]);
  };

  return (
    <div>
      <form onSubmit={searchHandler}>
        <Grid container className="whiteBox">
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
            className="labels"
            spacing={1}
            style={{ margin: 10 }}
          >
            <Grid container xs={2} direction="column" spacing={1}>
              <Grid item>
                <label htmlFor="labels">From:</label>
              </Grid>
              <Grid item>
                <FormControl>
                  <OutlinedInput
                    className="inputBoxes"
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
                </FormControl>
              </Grid>
            </Grid>

            <Grid container xs={2} direction="column" spacing={1}>
              <Grid item>
                <label htmlFor="labels">To:</label>
              </Grid>
              <Grid item>
                <FormControl>
                  <OutlinedInput
                    className="inputBoxes"
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
                </FormControl>
              </Grid>
            </Grid>
            <Grid container xs={2} direction="column" spacing={1}>
              <Grid item>
                <label htmlFor="labels">Depart:</label>
              </Grid>
              <Grid item>
                <OutlinedInput
                  className="inputBoxes"
                  type="date"
                  defaultValue=""
                  onChange={(input) => setDepartDate(input.target.value)}
                />
              </Grid>
            </Grid>
            <Grid container xs={2} direction="column" spacing={1}>
              <Grid item>
                <label htmlFor="labels">Return:</label>
              </Grid>
              <Grid item>
                <OutlinedInput
                  className="inputBoxes"
                  type="date"
                  disabled={returnInput}
                  defaultValue=""
                  onChange={(input) => setReturnDate(input.target.value)}
                />
              </Grid>
            </Grid>
            <Grid container xs={2} direction="column" spacing={1}>
              <Grid item>
                <label htmlFor="labels">Passengers:</label>
              </Grid>
              <Grid item>
                <Select
                  className="inputPassenger"
                  variant="outlined"
                  value={passenger}
                  onChange={(input) => setPassenger(input.target.value)}
                >
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                </Select>
              </Grid>
            </Grid>
          </Grid>

          <Grid container direction="row" alignItems="center" spacing={1}>
            <Grid
              container
              direction="row"
              xs={4}
              spacing={1}
              style={{ marginLeft: 10 }}
            >
              <Grid item>
                <RadioGroup row defaultValue="return">
                  <FormControlLabel
                    value="return"
                    control={<Radio style={{ color: "#143E52" }} />}
                    label="Roundtrip"
                    onClick={inputHandler}
                  />
                  <FormControlLabel
                    className="radio-button"
                    value="one-way"
                    control={<Radio style={{ color: "#143E52" }} />}
                    label="One-way"
                    onClick={inputHandler}
                  />
                </RadioGroup>
              </Grid>
            </Grid>

            <Grid
              container
              xs={8}
              direction="row"
              spacing={1}
              justify="flex-end"
            >
              <Grid item className="icon-text" style={{ marginRight: 10 }}>
                <Link to="/favorites">
                  <IconButton>
                    <FontAwesomeIcon icon={faHeart} className="heart-button" />
                  </IconButton>
                </Link>
                Go to your flights
              </Grid>

              <Grid item style={{ marginRight: 26 }}>
                <Button
                  className="search-button"
                  type="search"
                  variant="contained"
                >
                  <FontAwesomeIcon
                    icon={faSearch}
                    style={{ marginRight: 15 }}
                  />
                  Search Flights
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>

      <div ref={myFlights}>
        <RenderFlights
          flights={flights}
          connections={connections}
          from={from}
          to={to}
          departDate={departDate}
          returnDate={returnDate}
          passenger={passenger}
          token={token}
        />
      </div>
      
    </div>
  );
}

export default SearchBox;
