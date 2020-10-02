import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import {
  faHeartbeat,
  faPlaneArrival,
  faPlaneDeparture,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { search } from "../actions-redux/searchActions";
import {
  Button,
  FormControl,
  InputAdornment,
  OutlinedInput,
} from "@material-ui/core";
import { Link } from "react-router-dom";

function SearchScreen(props) {
  //1-setting props in our state
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departDate, setDepartDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());

  //6-We map the new state with the new props = mapStateToPros
  const userSearch = useSelector((state) => state.userSearch);
  const userInputs = userSearch;

  //7-We dispatch the props =mapDispatchToProps
  const dispatch = useDispatch();

  //7-We call dispatch
  useEffect(() => {
    if (userInputs) {
      console.log(userInputs);
    }
    return () => {
      //
    };
  }, [userInputs]);

  const searchHandler = (input) => {
    console.log("Your search is about to start;3,2,1..");
    console.log(from + " " + to + +"/" + departDate + "/" + returnDate);

    input.preventDefault();
    // In this case, a preventDefault is called on the event when submitting the form to prevent a browser reload/refresh
    dispatch(search(from, to, departDate, returnDate));
    //2-post action search to redux-actions
  };

  return (
    <div className="searchbox">
      <div className="search-inputs">
        <div className="form">
          <form onSubmit={searchHandler}>
            <ul className="form-container">
              <h2>Let's start your trip!</h2>
              <li>
                <label htmlFor="to">
                  <h3>From:</h3>
                </label>
                <div className="margin">
                  <Grid container spacing={1} alignItems="flex-end">
                    <FormControl variant="outlined">
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
                    </FormControl>
                  </Grid>
                </div>
              </li>
              <br />
              <li>
                <form className="container" noValidate autoComplete="off">
                  <TextField
                    id="date"
                    label="Departure"
                    type="date"
                    defaultValue=""
                    className="textField"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(input) => setDepartDate(input.target.value)}
                  />
                </form>
              </li>
              <li>
                <label htmlFor="to">
                  <h3>To:</h3>
                </label>
                <div className="margin">
                  <Grid container spacing={1} alignItems="flex-end">
                    <FormControl variant="outlined">
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
                    </FormControl>
                  </Grid>
                </div>
              </li>
              <br />
              <li>
                <form className="container" noValidate autoComplete="off">
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
                </form>
              </li>
              <br />
              <li>
                <Button
                  type="search"
                  variant="contained"
                  className="search-button"
                >
                  <FontAwesomeIcon icon={faSearch} />
                </Button>
              </li>
              <li>
                <Link to="/favorites">
                  <IconButton>
                    <FontAwesomeIcon
                      icon={faHeartbeat}
                      className="icon-button"
                    />
                  </IconButton>
                </Link>
              </li>
            </ul>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SearchScreen;
