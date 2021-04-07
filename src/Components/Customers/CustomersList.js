import React, { useState } from 'react'
import {useSelector} from 'react-redux'
import CustomerItem from './CustomerItem'

import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import SearchIcon from '@material-ui/icons/Search'
import InputAdornment from "@material-ui/core/InputAdornment"

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
            {
                customers.length === 0? (
                    <div>
                        <h3>No customers are found</h3>
                        <p>Add customers</p>
                    </div>
                ) : (
                    <div>
                        <h2 style={{color: "blue"}} >Customers List </h2>
                        <TextField  
                            style={{width: '30%', marginBottom : '25px'}}
                            variant="outlined"
                            size="small"
                            type = "text" 
                            placeholder = 'Search by name...'
                            onChange = {handleChange} 
                            value = {search}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                       <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
  
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
        </div>
    )
}
export default CustomersList