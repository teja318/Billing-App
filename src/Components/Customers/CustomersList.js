import React from 'react'
import {useSelector} from 'react-redux'
import CustomerItem from './CustomerItem'
const CustomersList = (props) =>{
    const customers = useSelector((state) =>{
        return state.customers
    })
    return (
        <div>
            <h2>Customers List -{customers.length}</h2>
            {
                customers.map((ele, i) =>{
                    return <CustomerItem key={i} {...ele}/>
                })                
            }
        </div>
    )
}
export default CustomersList