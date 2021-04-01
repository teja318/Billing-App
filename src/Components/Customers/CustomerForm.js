import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {startAddCustomers, startEditCustomer} from '../../Actions/customersAction'
import validator from 'validator'

import CancelIcon from '@material-ui/icons/Cancel'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

const CustomerForm = (props) =>{
    const {id , name : NAME, email : EMAIL , mobile: MOBILE,handleToggle} = props
    const dispatch = useDispatch()

    const[name, SetName] = useState(NAME? NAME : "")
    const[mobile, setMobile] = useState(MOBILE? MOBILE : "")
    const[email, setEmail] = useState(EMAIL? EMAIL : "")
    const [formErrors, setFormErrors] = useState({})
    const errors={}

    const handleChange = (e) =>{
        if((e.target.name) === 'name'){
            SetName(e.target.value)
        }else if((e.target.name) === 'mobile'){
            setMobile(e.target.value)
        }else if((e.target.name) === 'email'){
            setEmail(e.target.value)
        }
    }

    const runValidation =(e) =>{
         //name
         if(name.trim().length === 0){
            errors.name = `name cann't be blank`
        }
        //mobile 
        if(mobile.trim().length === 0){
            errors.mobile = `mobile cann't be blank`
        }

        //email
        if(email.trim().length === 0){
            errors.email = "email cann't be blank"
        }else if(!(validator.isEmail(email))){
            errors.email = "invalid email format"
        }
    }
    const handleSubmit = (e) =>{
        e.preventDefault()

        runValidation()
        if(Object.keys(errors).length === 0){
            setFormErrors({})
            const formData = {
                name: name,
                mobile: mobile,
                email: email
            }
            if(handleToggle){
                dispatch(startEditCustomer(formData ,id))
                handleToggle()
            } else {
                dispatch(startAddCustomers(formData))
            }
            SetName("")
            setMobile("")
            setEmail("")
        }else{
            setFormErrors(errors)
        }
    }
    return(
        <div>
            {NAME? <h2>Edit Customer</h2> : <h2>Add Customer</h2>}
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}> 
                        <TextField variant="outlined" size="small"  type="text" label="Name" name="name" value={name} onChange={handleChange} />
                        { formErrors.name && <Typography style={{color : 'red'}}> {formErrors.name} </Typography> }
                    </Grid>

                    <Grid item xs={12}> 
                        <TextField variant="outlined" size="small" type="text" label="Mobile" name="mobile" value={mobile} onChange={handleChange} />
                        { formErrors.mobile && <Typography style={{color : 'red'}}> {formErrors.mobile} </Typography> }
                    </Grid>
                    <Grid item xs={12}> 
                        <TextField variant="outlined" size="small" type="text" label="Email" name="email" value={email} onChange={handleChange} />
                        { formErrors.email && <Typography style={{color : 'red'}}> {formErrors.email} </Typography> }
                    </Grid>
                
                    <Grid item xs={12}> 
                        <Button type="submit" size="small" variant="contained" color="primary"> {NAME ? 'Save' : 'Add'} </Button>
                        {handleToggle && <Button onClick ={handleToggle} style={{color: 'red'}}><CancelIcon /></Button>}
                    </Grid>
                </Grid>
               
            </form>
        </div>
    )
}
export default CustomerForm