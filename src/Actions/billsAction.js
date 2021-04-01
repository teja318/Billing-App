import axios from 'axios'
export const startGetBills = () =>{
    return(dispatch) =>{
        axios.get('http://dct-billing-app.herokuapp.com/api/bills', {
            headers:{
                "Authorization":`Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((response) => {
            const result = response.data
            if(result.hasOwnProperty("errors")){
               alert(result.message)
            }else{
                dispatch(setBills(result))
            }
                
        })
        .catch((error) => {
            alert(error.message)
        })
    } 
}

export const setBills = (data) =>{
    return{
        type: 'GET_BILLS',
        payload: data
    }
}