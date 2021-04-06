import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import usersReducer from '../Reducers/usersReducers'
import accountReducer from '../Reducers/accountReducer'
import productsReducer from '../Reducers/productsReducer'
import customersReducer from '../Reducers/customersReducer'
import billReducer from '../Reducers/billReducer'
import lineItemsReducer from '../Reducers/lineItemsReducer'
const configureStore = () =>{
    
    const store = createStore(combineReducers({
        users: usersReducer,
        userDetails: accountReducer,
        products: productsReducer,
        customers: customersReducer,
        lineItems: lineItemsReducer,
        bills: billReducer
    }), applyMiddleware(thunk))
    
    return store
}
export default configureStore

