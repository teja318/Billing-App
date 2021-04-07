import React, { useState } from 'react'
import axios from 'axios'
import swal from 'sweetalert'

import validator from 'validator'

//material ui
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(4.8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
}));
  
const Register = (props) =>{
    const classes = useStyles()

    const[username, setUsername] = useState('')
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    const[businessName, setBusinessName] = useState('')
    const[address, setAddress] = useState('')
    const[formErrors , setFormErrors] = useState({})
    const errors= {}

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
    const runValidation = ()=>{
        //name
        if(username.trim().length === 0){
            errors.username = "name cannot be blank"
        }
        //for email
        if(email.trim().length === 0){
            errors.email = "email cannot be blank"
        } else if(!(validator.isEmail(email))){
            errors.email = "invalid email format"
        }
        //password
        if(password.trim().length === 0){
            errors.password = "password cannot be blank"
        }else if(password.trim().length <= 8){
            errors.password = "password should contain 8 characters "
        }
        // for businessname
        if(businessName.trim().length === 0){
            errors.businessName = "businessName cannot be blank"
        }
        // for address
        if(address.trim().length === 0){
            errors.address = "address cannot be blank"
        }

    }
    const handleSubmit=(e) =>{
        e.preventDefault()
        runValidation ()

        if(Object.keys(errors).length === 0){
            setFormErrors({})
            const formData = {
                username: username,
                email: email,
                password: password,
                businessName: businessName,
                address: address
            }
            
            axios.post('http://dct-billing-app.herokuapp.com/api/users/register', formData)
            .then((response) => {
                const result = response.data
                console.log('action', result)
                if(result.hasOwnProperty("errors")){ //Object.keys(result).includes('errors')
                    swal(result.message)
                }else{
                    swal("successfully created")
                    props.history.push('/login')
                }
                
            })
            .catch((error) => {
                swal(error.message)
            })
            setUsername('')
            setEmail('')
            setPassword('')
            setBusinessName('')
            setAddress('')
        }else{
            setFormErrors(errors)
        }
    }
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                              variant="outlined"
                              required
                              fullWidth
                              id="username"
                              value={username}
                              label="User Name"
                              name="username"
                              autoFocus
                              onChange={handleChange}
                            />
                            {formErrors.username && <span style={{color : 'red'}}>{formErrors.username}</span>}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                              variant="outlined"
                              required
                              fullWidth
                              id="email"
                              value={email}
                              label="Email Address"
                              name="email"
                              onChange={handleChange}
                            />
                            {formErrors.email && <span style={{color : 'red'}}>{formErrors.email}</span>}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                              variant="outlined"
                              required
                              fullWidth
                              name="password"
                              label="Password"
                              type="password"
                              value={password}
                              id="password"
                              onChange={handleChange}
                              autoComplete="current-password"
                            />
                            {formErrors.password && <span style={{color : 'red'}}>{formErrors.password}</span>}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                              variant="outlined"
                              required
                              fullWidth
                              id="businessName"
                              label="Business Name "
                              value={businessName}
                              name="businessName"
                              onChange={handleChange}
                              autoComplete="businessName"
                            />
                            {formErrors.businessName && <span style={{color : 'red'}}>{formErrors.businessName}</span>}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="address"
                                label="Address"
                                value={address}
                                name="address"
                                onChange={handleChange}
                                autoComplete="address"
                            />
                            {formErrors.address && <span style={{color : 'red'}}>{formErrors.address}</span>}
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="/login" variant="body2">
                              Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        
        </Container>
    )
}
export default Register