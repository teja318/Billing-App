import React, { useState } from 'react' 
import axios from 'axios'
import validator from 'validator' 
import swal from 'sweetalert'

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
      marginTop: theme.spacing(8),
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
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

const Login = (props) =>{
    const classes= useStyles()
    const {handleAuth} = props
    const[email,setEmail] = useState("")
    const[password, setPassword] = useState("")
    const[formErrors, setFormErrors] = useState({})
    const errors ={}
    const handleChange=(e) =>{
        if(e.target.name === "email"){
            setEmail(e.target.value)
        }else if(e.target.name === "password"){
            setPassword(e.target.value)
        }
    }

    const runValidation = () =>{
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
    }
    const handleSubmit=(e) =>{
        e.preventDefault()
        runValidation()
        if(Object.keys(errors).length === 0){
            setFormErrors({})
            const formData={
                email: email,
                password: password
            }
            axios.post('http://dct-billing-app.herokuapp.com/api/users/login', formData)
            .then((response) => {
                const result = response.data
                if(Object.keys(result).includes('errors')){ //result.hasOwnProperty("errors")
                    swal("not registered")
                    console.log(result.message)
                }else{
                swal("successfully logged in")
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
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            // id="email"
            label="Email Address"
            value={email}
            name="email"
            //autoComplete="email"
            autoFocus
            onChange={handleChange}
          />
          {formErrors.email && <span style={{color : 'red'}}>{formErrors.email}</span>}
          <TextField
            variant="outlined"
            //margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            value={password}
            onChange={handleChange}
            type="password"
            id="password"
            autoComplete="current-password"
          />
          {formErrors.password && <span style={{color : 'red'}}>{formErrors.password}</span>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      
    </Container>
            
    )
}
export default Login