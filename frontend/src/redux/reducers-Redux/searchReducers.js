const { USER_SEARCH } = require("../constants-redux/constants")

//4-we recibe the action and we update the state with the data we have get in a new state:UserInputs
const userSearchReducer = (state={}, action)=>{
    switch(action.type){
        case USER_SEARCH:
            return { userInputs: action.payload}
        default:
            return state
    }
}

// function userUpdateSearchReducer= (state={}, action){
//     switch(action.type){
        
//     }
// }

export {userSearchReducer}