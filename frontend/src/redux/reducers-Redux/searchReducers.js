import{ USER_SEARCH_REQUEST, USER_SEARCH_SUCCESS, USER_SEARCH_FAIL } from "../constants-redux/constants";

//4-we recibe the action and we update the state with the data we have get in a new state:UserInputs
const userSearchReducer = (state={}, action)=>{
    switch(action.type){
        case USER_SEARCH_REQUEST:
            return {loading:true}
        case USER_SEARCH_SUCCESS:
            return { loading:false, userInputs: action.payload}
        case USER_SEARCH_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}


export {userSearchReducer}

