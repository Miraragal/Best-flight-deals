import { set } from "js-cookie";
import React, { useState, useEffect } from "react";
import { useDispatch,useSelector} from "react-redux";
import { search } from "../redux/actions-redux/searchActions";
import { postSearch } from "../data/api";

function FlightsScreen(props) {
  console.log(props)
  const [from, setFrom] = useState(props.location.state.from);
  const [to, setTo] = useState(props.location.state.to);
  const [token, setToken] = useState(props.location.state.token);
  const [departDate, setDepartDate] = useState(props.location.state.departDate);
  const [returnDate, setReturnDate] = useState(props.location.state.returnDate);
  const [passenger, setPassenger] = useState(props.location.state.passenger);
  const dispatch = useDispatch();
  

  useEffect(() => {
  dispatch(search(from, to, departDate, returnDate, passenger, token))
  }, []);



  return <div className="flightsbox">FlightsPAGE</div>;
}

export default FlightsScreen;

