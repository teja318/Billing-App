import axios from 'axios'
export const startGetproducts = () =>{
    return(dispatch) =>{
        axios.get('http://dct-billing-app.herokuapp.com/api/products', {
            headers:{
                "Authorization":`Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((response) => {
            const result = response.data
            //console.log('action result', result)
            if(result.hasOwnProperty("errors")){
               alert(result.message)
            }else{
                dispatch(setProducts(result))
            }
                
        })
        .catch((error) => {
            alert(error.message)
        })
    } 
}

export const setProducts = (data) =>{
    return{
        type: 'SET_PRODUCTS',
        payload: data
    }
}

//Add products
export const startAddproducts = (formdata) =>{
    return(dispatch) =>{
        axios.post('http://dct-billing-app.herokuapp.com/api/products', formdata, {
            headers:{
                "Authorization":`Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((response) => {
            const result = response.data
            if(result.hasOwnProperty("errors")){
               alert(result.message)
            }else{
                dispatch(addproducts(result))
            }
                
        })
        .catch((error) => {
            alert(error.message)
        })
    } 
}

export const addproducts = (data) =>{
    return{
        type: "ADD_PRODUCTS",
        payload: data
    }
}

// remove functionality

export const startGetRemove =(id)=>{
    return (dispatch)=>{
        axios.delete(`http://dct-billing-app.herokuapp.com/api/products/${id}`,{
            headers:{
                "Authorization":`Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((response)=>{
            const result = response.data
            if(Object.keys(result).includes('errors')){
                alert(result.message)
            } else{
                //alert("successfully removed the product ")
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
export const startEditProduct=(formData,id)=>{
    return (dispatch)=>{
        axios.put(`http://dct-billing-app.herokuapp.com/api/products/${id}`, formData ,{
            headers:{
                "Authorization":`Bearer ${localStorage.getItem('token')}`
            } })
            .then((response)=>{
                const result = response.data
                if(Object.keys(result).includes('errors')){
                    alert(result.message)
                } else {
                    alert("successfully Edit the product information")
                    dispatch(editProduct(result))
                }
            })
            .catch((err)=>{
                console.log(err.message)
            })
    }
}

export const editProduct =(data)=>{
    return {
        type : "EDIT" ,
        payload : data
    }
}