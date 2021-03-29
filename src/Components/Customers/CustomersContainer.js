import React, { useEffect } from 'react' 
import { useDispatch } from 'react-redux'
import {startGetCustomers} from '../../Actions/customersAction'
import CustomerForm from './CustomerForm'
import CustomersList from './CustomersList'

const CustomersContainer = (props) =>{
    const dispatch = useDispatch()

    useEffect(() =>{
        dispatch(startGetCustomers())
    })
    return (
        <div>
            <CustomerForm />
            <CustomersList />
        </div>
    )
}
export default CustomersContainer