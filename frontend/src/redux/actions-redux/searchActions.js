import * as constants from "../constants-redux/constants";
import { airportsInfo } from "../../data/airports";
import { postSearch } from "../../data/api";

//3-Setting the action and its payload
export const search = (from,to,departDate,returnDate,passenger,token) => {
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

  const data = {
    originLocationCode: originCode[0].IATACODE, //string
    destinationLocationCode: destinationCode[1].IATACODE, //string
    departureDate: departDate, //ISO 8601 YYYY-MM-DD
    returnDate: returnDate, //idem
    adults: passenger, // integer
    nonStop: false, //boolean
    max: 250, //integer (max number of flights offerts to return-default paramater)
  };

  const urlParams = Object.keys(data)
    .map(function (key) {
      return key + "=" + data[key];
    })
    .join("&");

   postSearch(urlParams, token);


  return {
    type: constants.USER_SEARCH_SUCCESS,
    payload: { from, to, departDate, returnDate, passenger, token }
 
  };

}
