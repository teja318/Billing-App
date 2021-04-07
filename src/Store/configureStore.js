import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import userReducer from '../Reducers/userReducer'
import productsReducer from '../Reducers/productsReducer'
import customersReducer from '../Reducers/customersReducer'
import billReducer from '../Reducers/billsReducer'
import lineItemsReducer from '../Reducers/lineItemsReducer'
const configureStore = () =>{
    
    const store = createStore(combineReducers({
        userDetails: userReducer,
        products: productsReducer,
        customers: customersReducer,
        lineItems: lineItemsReducer,
        bills: billReducer
    }), applyMiddleware(thunk))
    
    return store
}
export default configureStore

