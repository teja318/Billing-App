import React from 'react'
import {Link, Route, withRouter} from 'react-router-dom'
import Home from './Home'
import Register from '../Components/User-Auth/Register'
import Login from '../Components/User-Auth/LogIn'
import Account from '../Components/User-Auth/Account'
import ProductsContainer from './Products/ProductsContainer'
import CustomersContainer from './Customers/CustomersContainer'
const NavBar = (props) =>{
    const {userLoggedIn, handleAuth} = props
    return (
        <div>
            
                <Link to="/">Home</Link> |
                {
                    userLoggedIn? (
                        <>
                            <Link to="/account">Account</Link> |
                            <Link to="/products">Products</Link> |
                            <Link to="/customers">Customers</Link> |
                            <Link  to='/'onClick={() => {
                                localStorage.removeItem('token')
                                alert('successfully logout')
                                handleAuth()
                            }}>LogOut</Link> 
                        </>
                    ) : (
                        <>
                            <Link to="/register">Register</Link> |
                            <Link to="/login">Login</Link>
                        </>
                    ) 
                }
            

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
        
        </div>
    )
}
export default withRouter(NavBar)
