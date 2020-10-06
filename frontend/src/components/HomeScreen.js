import React, { useState, useEffect } from "react";
import { useDispatch} from "react-redux";
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
import { search } from "../redux/actions-redux/searchActions";
import {
  Button,
  FormControl,
  InputAdornment,
  MenuItem,
  OutlinedInput,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { getToken} from "../data/auth";


function SearchScreen(props) {
  //1-setting props in our state
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [token, setToken] = useState("");
  const [departDate, setDepartDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());
  const [passenger, setPassenger] = useState(1);

  // //6-We map the new state with the new props = mapStateToPros
  // const userSearch = useSelector((state) => state.userSearch);
  // const userInputs = userSearch;

  //7-We dispatch the props =mapDispatchToProps
  const dispatch = useDispatch();

  //7- We call componentDiMount
  useEffect(() => {
  //To unwrap the promise. We define an async function that will be called when declared searchHandler
    async function myToken(){
      try {
        setToken(await getToken())
        //Await for the getToken() to complete and declare the result in the vble token
      } catch (err) {
        console.log("Error: " + err);
      }
    }    
    myToken()
  }, [])


  const searchHandler = async (input) => {
    input.preventDefault();
    // In this case, a preventDefault is called on the event when submitting the form to prevent a browser reload/refresh
    dispatch(search(from, to, departDate, returnDate, passenger, token));
    //2-post action search to redux-actions
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
              <FontAwesomeIcon icon={faSearch} /> Search
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
  );
}

export default SearchScreen;


