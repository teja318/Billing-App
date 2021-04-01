import React, { useState } from 'react'
import {useSelector} from 'react-redux'
import CustomerItem from './CustomerItem'

import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'

const CustomersList = (props) =>{
    const[search, setSearch] = useState('')

    const customers = useSelector((state) =>{
        return state.customers
    })

    //search functionality
    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    const customersData = customers.filter((customer)=>{
        return customer.name.toLowerCase().match(search.toLowerCase())
    })
    
    return (
        <div>
            <h2>Customers List -{customers.length}</h2>
            <TextField  
                style={{width: '30%', marginBottom : '25px'}}
                variant="outlined"
                size="small"
                type = "text" 
                placeholder = "Search by name..." 
                onChange = {handleChange} 
                value = {search}
            />
            <Grid container spacing={2} style={{overflowY : 'scroll', maxHeight : '400px'}} >
            
                {customersData.map((ele,i) => {
                    return (
                        <Grid item xs={4} key={i}>
                            <CustomerItem  {...ele} />
                        </Grid>
                    )
                })}
            </Grid>
        </div>
    )
}
export default CustomersList