import React, { useState } from 'react' 
import axios from 'axios'
const Login = (props) =>{
    const {handleAuth} = props
    const[email,setEmail] = useState("")
    const[password, setPassword] = useState("")
    const handleChange=(e) =>{
        if(e.target.name === "email"){
            setEmail(e.target.value)
        }else if(e.target.name === "password"){
            setPassword(e.target.value)
        }
    }
    const handleSubmit=(e) =>{
        e.preventDefault()

        const formData={
            email: email,
            password: password
        }
        axios.post('http://dct-billing-app.herokuapp.com/api/users/login', formData)
        .then((response) => {
            const result = response.data
           if(Object.keys(result).includes('errors')){ //result.hasOwnProperty("errors")
                alert("not registered")
                console.log(result.message)
            }else{
                alert("successfully logged in")
                localStorage.setItem('token', result.token)
                props.history.push('/')
                handleAuth()
            }  
        })
        .catch((error) => {
            alert(error.message)
        })
        setEmail('')
        setPassword('')
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Enter email" name="email" value={email} onChange={handleChange} /> <br />
                <input type="text" placeholder="Enter Password" name="password" value={password} onChange={handleChange} /> <br />
                <input type="submit" />
            </form>
        </div>
    )
}
export default Login