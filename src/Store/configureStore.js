import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import usersReducer from '../Reducers/usersReducers'
import accountReducer from '../Reducers/accountReducer'
import productsReducer from '../Reducers/productsReducer'
import customersReducer from '../Reducers/customersReducer'
import billReducer from '../Reducers/billReducer'

const configureStore = () =>{
    
    const store = createStore(combineReducers({
        users: usersReducer,
        userDetails: accountReducer,
        products: productsReducer,
        customers: customersReducer,
        bills: billReducer
    }), applyMiddleware(thunk))
    
    return store
}
export default configureStore

