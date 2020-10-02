import * as constants from "../constants-redux/constants";

//3-Setting the action and its payload
export const search = (from)=> {
    return{
        type:constants.USER_SEARCH,
        payload: {from}
    }
}

// export const updateSearch = (from, to, departDate,returnDate)=>{
//     return{
//         type:constants.USER_UPDATE_SEARCH,
//         payload: {from, to, departDate,returnDate}
//     }
// }

