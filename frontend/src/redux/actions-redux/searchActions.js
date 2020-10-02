import * as constants from "../constants-redux/constants";

//3-Setting the action and its payload
export const search = (from, to, departDate,returnDate, passenger)=> {
    console.log(from)
    return{
        type:constants.USER_SEARCH,
        payload: {from, to, departDate,returnDate, passenger}
    }
}

// export const updateSearch = (from, to, departDate,returnDate, passenger)=>{
//     return{
//         type:constants.USER_UPDATE_SEARCH,
//         payload: {from, to, departDate,returnDate, passenger}
//     }
// }

