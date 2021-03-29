import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {startGetUsers} from '../../Actions/usersActions'
const Register = (props) =>{
    const dispatch = useDispatch()

    const[username, setUsername] = useState('')
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    const[businessName, setBusinessName] = useState('')
    const[address, setAddress] = useState('')

    const handleChange=(e) =>{
        if(e.target.name === "username"){
            setUsername(e.target.value)
        }else if(e.target.name === "email"){
            setEmail(e.target.value)
        }else if(e.target.name === "password"){
            setPassword(e.target.value)
        }else if(e.target.name === "businessName"){
            setBusinessName(e.target.value)
        }else if(e.target.name === "address"){
            setAddress(e.target.value)
        }
    }
    const handleSubmit=(e) =>{
        e.preventDefault()

        const formData = {
            username: username,
            email: email,
            password: password,
            businessName: businessName,
            address: address
        }
        dispatch(startGetUsers(formData, props.history.push))
        console.log('formData',formData)
        
        setUsername('')
        setEmail('')
        setPassword('')
        setBusinessName('')
        setAddress('')
    }
    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Enter UserName" name="username" value={username} onChange={handleChange} /> <br />
                <input type="text" placeholder="Enter email" name="email" value={email} onChange={handleChange} /> <br />
                <input type="text" placeholder="Enter Password" name="password" value={password} onChange={handleChange} /> <br />
                <input type="text" placeholder="Enter businessName" name="businessName" value={businessName} onChange={handleChange} /> <br />
                <textarea type="text" placeholder="Enter address" name="address" value={address} onChange={handleChange} ></textarea>   <br />
                <input type="submit"  />
            </form>
        </div>
    )
}
export default Register