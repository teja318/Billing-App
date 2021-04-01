import React,{useState, useEffect} from 'react'
import NavBar from './Components/NavBar'

const App = (props) =>{
  const [userLoggedIn, setUserLoggedIn] = useState(false)
  const handleAuth = () => {
    setUserLoggedIn(!userLoggedIn)
  }
  useEffect(() => {
    if(localStorage.getItem('token')){
      handleAuth()
    }
  },[])

  return (
    <div>
      <h2 style={{textAlign: 'center'}}>Billing Application</h2>
      <NavBar userLoggedIn={userLoggedIn} handleAuth={handleAuth} />
    </div>
  )
}
export default App