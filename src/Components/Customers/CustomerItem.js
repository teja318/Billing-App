import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {startGetRemove} from '../../Actions/customersAction'
import EditCustomer from './EditCustomer'
const CustomerItem = (props) =>{
    const dispatch = useDispatch()
    const {_id, name, email, mobile} = props
    const [toggle, setToggle] = useState(false)
    const handleRemove =() =>{
        const conformation = window.confirm(`Are you sure to remove the ${name} from the list `)
        if(conformation){
            dispatch(startGetRemove(_id))
        }
    }
    const handleToggle = () =>{
        setToggle(!toggle)
    }
    return(
        <div>
            {
                toggle? (
                    <div>
                        <EditCustomer id = {_id} name = {name} email = {email} mobile ={mobile} handleToggle ={handleToggle}/> 
                        <button onClick ={handleToggle}>Cancel</button>
                    </div>
                ) : (
                    <div>
                        <blockquote>
                        <h4>Name : {name}</h4>
                        <p>email : {email}</p>
                        <p>Mobile: {mobile}</p>
                        <button onClick = {handleRemove} >remove</button>  <b> | </b>
                        <button onClick = {handleToggle} >Edit</button>
                        </blockquote>
                    </div>
                )
            }
            
            

        </div>
    )
}
export default CustomerItem