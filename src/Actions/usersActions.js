import axios from 'axios'
import swal from 'sweetalert'
export const startGetUsers = (formData, navigate) =>{
    return(dispatch) =>{
        axios.post('http://dct-billing-app.herokuapp.com/api/users/register', formData)
        .then((response) => {
            const result = response.data
            console.log('action', result)
            if(result.hasOwnProperty("errors")){ //Object.keys(result).includes('errors')
                swal(result.message)
                
            }else{
                swal("successfully created")
                dispatch(setUsers(result))
                navigate('/login')
            }
                
        })
        .catch((error) => {
            alert(error.message)
        })
    }
}

//set users post data
export const setUsers = (data) =>{
    return{
         type: "SET_USERS",
         payload: data
     }
} 
