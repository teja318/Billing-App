import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {startAddproducts, startEditProduct} from '../../Actions/productAction'

import CancelIcon from '@material-ui/icons/Cancel'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
//import SaveIcon from '@material-ui/icons/Save';

const ProductForm = (props)=>{
    const {id, name : NAME, price : PRICE, handleToggle} = props
    const dispatch = useDispatch() 

    const [name, setName] = useState(NAME? NAME : "")
    const [price, setPrice] = useState(PRICE? PRICE : "")
    const [formErrors, setFormErrors] = useState({})
    const errors={}

    const handleChange=(e)=>{
        if((e.target.name) === 'name'){
            setName(e.target.value)
        }else if((e.target.name) === 'price'){
            setPrice(e.target.value)
        }
    }

    const runValidations = () => {
        //name
        if(name.trim().length === 0){
            errors.name = 'name cannot be blank'
        }
        //price 
        if(price.trim().length === 0){
            errors.price = 'price cannot be blank'
        }
    }
    const handleSubmit = (e) =>{
        e.preventDefault()
        
        runValidations()

        if(Object.keys(errors).length === 0){
            setFormErrors({})
            const data = {
                name: name,
                price: Number(price)
            }
    
            if(handleToggle){
                dispatch(startEditProduct(data,id))
                handleToggle()
            } else{
                dispatch(startAddproducts(data))
            }
            setName('')
            setPrice('')
        }else{
          setFormErrors(errors)
        }
      
        
    }
    return(
        <div>
            {NAME? <h2>Edit Product</h2> : <h2>Add Product</h2>}
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}> 
                        <TextField variant="outlined" size="small"  type="text" label="Name" name="name" value={name} onChange={handleChange} />
                        { formErrors.name && <Typography style={{color : 'red'}}> {formErrors.name} </Typography> }
                    </Grid>

                    <Grid item xs={12}> 
                        <TextField variant="outlined" size="small" type="text" label="Price" name="price" value={price} onChange={handleChange} />
                        { formErrors.price && <Typography style={{color : 'red'}}> {formErrors.price} </Typography> }
                    </Grid>
                
                    <Grid item xs={12}> 
                        <Button type="submit" size="small" variant="contained" color="primary"> {NAME ? 'Save' : 'add'} </Button>
                        {handleToggle && <Button onClick ={handleToggle} style={{color: 'red'}}><CancelIcon /></Button>}
                    </Grid>
                </Grid>
               
            </form>
        </div>
    )
}

export default ProductForm