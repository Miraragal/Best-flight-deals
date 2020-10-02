import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {userSearchReducer} from './reducers-Redux/searchReducers'


const initialState={}
const reducers= combineReducers({
    //5-We bring the newState from the reducer
    UserSearch: userSearchReducer
    
})
const composeEnhancer= window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__

const store= createStore (reducers, initialState, composeEnhancer(applyMiddleware(thunk)))
export default store;