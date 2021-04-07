import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import configureStore from './Store/configureStore'
import App from './App'
import {startAccountInfo} from './Actions/userAction'
import {startGetCustomers} from './Actions/customersAction'
import {startGetproducts} from './Actions/productAction'
const store = configureStore()
//console.log(store.getState())

store.subscribe(() => {
  console.log('stateUpdated' ,store.getState())
})
if(localStorage.getItem('token')){
  store.dispatch(startAccountInfo())
  store.dispatch(startGetproducts())
  store.dispatch(startGetCustomers())
}
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
document.getElementById('root'))