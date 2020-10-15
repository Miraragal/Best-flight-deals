import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import IconButton from "@material-ui/core/IconButton";
import {
  faHeartbeat,
  faPlaneArrival,
  faPlaneDeparture,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  FormControl,
  InputAdornment,
  MenuItem,
  OutlinedInput,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { getToken } from "../data/auth";
import axios from "axios";
import { airportsInfo } from "../data/airports";
import { urlGetFlights } from "../data/config";
import {RenderFlights} from './FlightsDisplay'


function SearchBox() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [token, setToken] = useState("");
  const [departDate, setDepartDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());
  const [passenger, setPassenger] = useState(1);
  const [flights, setFlights] = useState([]);
  const [connections, setConnections] = useState([]);

  //We call componentDiMount
  useEffect(() => {
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
                id="goDate"
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
                id="backDate"
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
              <Button
                type="search"
                variant="contained"
                className="search-button"
              >
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
      </div>
      <RenderFlights  
        flights={flights}
        connections={connections}
        from={from}
        to={to}
        departDate={departDate}
        returnDate={returnDate}
        passenger={passenger}
        token={token} />
    </div>
  );
}

export default SearchBox;
