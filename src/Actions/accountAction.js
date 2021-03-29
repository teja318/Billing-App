import axios from 'axios'

export const startAccountInfo = ( ) => {
    return (dispatch)=>{
        axios.get('http://dct-billing-app.herokuapp.com/api/users/account',{
            headers:{
                "Authorization":`Bearer ${localStorage.getItem('token')}`
            }
        })
        . then((response)=>{
            const result = response.data
            dispatch(accountInfo(result))
        })
        .catch((err)=>{
            console.log(err.message)
        })
    }
}

export const accountInfo = (data) =>{
    return {
        type : "ACCOUNT_INFO",
        payload : data
    }
}

export const clearStore=()=>{
    return {
        type : "CLEAR"
    }
}