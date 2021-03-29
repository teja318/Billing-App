import axios from 'axios'
export const startGetCustomers = () =>{
    return(dispatch) =>{
        axios.get('http://dct-billing-app.herokuapp.com/api/customers', {
            headers:{
                "Authorization":`Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((response) => {
            const result = response.data
            if(result.hasOwnProperty("errors")){
               alert(result.message)
            }else{
                dispatch(setCustomers(result))
            }
                
        })
        .catch((error) => {
            alert(error.message)
        })
    } 
}

export const setCustomers = (data) =>{
    return{
        type: 'SET_CUSTOMERS',
        payload: data
    }
}

//Add Customers
export const startAddCustomers = (formdata) =>{
    return(dispatch) =>{
        axios.post('http://dct-billing-app.herokuapp.com/api/customers', formdata, {
            headers:{
                "Authorization":`Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((response) => {
            const result = response.data
            if(result.hasOwnProperty("errors")){
               alert(result.message)
            }else{
                dispatch(addCustomers(result))
            }
                
        })
        .catch((error) => {
            alert(error.message)
        })
    } 
}

export const addCustomers = (data) =>{
    return{
        type: "ADD_CUSTOMERS",
        payload: data
    }
}

// remove functionality

export const startGetRemove =(id)=>{
    return (dispatch)=>{
        axios.delete(`http://dct-billing-app.herokuapp.com/api/customers/${id}`,{
            headers:{
                "Authorization":`Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((response)=>{
            const result = response.data
            if(Object.keys(result).includes('errors')){
                alert(result.message)
            } else{
                alert("successfully removed the customers ")
                dispatch(remove(result))
            }
        })
    }
}

export const remove=(id)=>{
    return {
        type : "REMOVE",
        payload : id
    }
}

//edit functionality
export const startEditCustomer=(formData,id)=>{
    return (dispatch)=>{
        axios.put(`http://dct-billing-app.herokuapp.com/api/customers/${id}`, formData ,{
            headers:{
                "Authorization":`Bearer ${localStorage.getItem('token')}`
            } })
            .then((response)=>{
                const result = response.data
                if(Object.keys(result).includes('errors')){
                    alert(result.message)
                } else {
                    alert("successfully Edit the customer information")
                    dispatch(editCustomer(result))
                }
            })
            .catch((err)=>{
                console.log(err.message)
            })
    }
}

export const editCustomer =(data)=>{
    return {
        type : "EDIT_CUSTOMER" ,
        payload : data
    }
}