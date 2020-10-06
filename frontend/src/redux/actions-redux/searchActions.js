import * as constants from "../constants-redux/constants";
import { airportsInfo } from "../../data/airports";

//3-Setting the action and its payload
export const search = (from, to, departDate, returnDate, passenger) => {
  
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
    e.LOCATION.toLowerCase().includes(from.toLowerCase()) ||
    e.AIRPORT_NAME.toLowerCase().includes(from.toLowerCase())
      ? destinationCode.push(e)
      : "Not found"
  );

  const data = {
    originLocationCode: from,
    destinationLocationCode: to,
    departureDate: departDate,
    returnDate: returnDate,
    adults: passenger,
    nonStop: false,
    max: 250,
  };

  return {
    type: constants.USER_SEARCH_SUCCESS,
    payload: data,
  };
};
