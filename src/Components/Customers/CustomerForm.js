import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {startAddCustomers, startEditCustomer} from '../../Actions/customersAction'
const CustomerForm = (props) =>{
    const {id , name : NAME, email : EMAIL , mobile: MOBILE,handleToggle} = props
    const dispatch = useDispatch()

    const[name, SetName] = useState(NAME? NAME : "")
    const[mobile, setMobile] = useState(MOBILE? MOBILE : "")
    const[email, setEmail] = useState(EMAIL? EMAIL : "")

    const handleChange = (e) =>{
        if((e.target.name) === 'name'){
            SetName(e.target.value)
        }else if((e.target.name) === 'mobile'){
            setMobile(e.target.value)
        }else if((e.target.name) === 'email'){
            setEmail(e.target.value)
        }
    }
    const handleSubmit = (e) =>{
        e.preventDefault()
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
    }
    return(
        <div>
            {NAME? <h2>Edit Customer</h2> : <h2>Add Customer</h2>}
            <form onSubmit={handleSubmit}>
                <label>Name</label> < br />
                <input type="text" name="name" value={name} onChange={handleChange} /> <br />
                <label>Mobile</label> <br />
                <input type="text" name="mobile" value={mobile} onChange={handleChange} /> <br />
                <label>Email</label><br />
                <input type="text" name="email" value={email} onChange={handleChange} /> <br />
                <input type="submit" value="Add Customer" />
            </form>

        </div>
    )
}
export default CustomerForm