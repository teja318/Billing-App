import React from 'react'
import {Link, Route, withRouter} from 'react-router-dom'
import Home from './Home'
import Register from '../Components/User-Auth/Register'
import Login from '../Components/User-Auth/LogIn'
import Account from '../Components/User-Auth/Account'
import ProductsContainer from './Products/ProductsContainer'
import CustomersContainer from './Customers/CustomersContainer'
import BillContainer from './Billing/BillContainer'
import CustomerBills from '../Components/Billing/CustomerBills'

import swal from 'sweetalert'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {makeStyles} from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'


const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
}));
const NavBar = (props) =>{
    const {userLoggedIn, handleAuth} = props
    const classes = useStyles()
    return (
        <div >
           <AppBar color="secondary" position="static">
            <Toolbar >
                <Typography><Button  style={{flexGrow: 1}} edge="end" component={Link} to='/' >
                    <HomeIcon /> 
                </Button>
                </Typography>
                {
                    userLoggedIn? (
                        <>
                            <Button className={classes.root}   component={Link} to="/account"> <AccountCircleIcon /> </Button>
                            <Button component={Link} to="/products">Products </Button>
                            <Button component={Link} to="/customers"> Customers </Button>
                            <Button component={Link} to="/Bills">Bills </Button>
                            <Button  component={Link} to='/'
                                onClick={() => {
                                    localStorage.removeItem('token')
                                    swal('successfully logout')
                                    handleAuth()
                                }}>LogOut
                                
                            </Button>

                        </>
                    ) : (
                        <>
                            <Button component={Link} to="/register"> Register</Button> 
                            <Button component={Link} to="/login"> Login </Button> 
                        </>
                    ) 
                }
            </Toolbar>
            </AppBar> 
            
            <Route path="/" component={Home} exact={true} />
            <Route path="/register" component={Register} />
            <Route path="/login" render={ (props) => {
                return <Login 
                    {...props} //this for histroyobject
                    handleAuth={handleAuth}
                />
            }} />
            <Route path="/account" component={Account} />
            <Route path="/products" component={ProductsContainer} />
            <Route path="/customers" component={CustomersContainer} />
            <Route path="/bills" component={BillContainer} />
            <Route path = "/customerbills/:id" component = {CustomerBills}/>
        </div>
    )
}
export default withRouter(NavBar)
