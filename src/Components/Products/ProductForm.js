import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {startAddproducts, startEditProduct} from '../../Actions/productAction'

const ProductForm = (props)=>{
    const {id, name : NAME, price : PRICE, handleToggle} = props
    const dispatch = useDispatch() 

    const [name, setName] = useState(NAME? NAME : "")
    const [price, setPrice] = useState(PRICE? PRICE : "")

    const handleChange=(e)=>{
        if((e.target.name) === 'name'){
            setName(e.target.value)
        }else if((e.target.name) === 'price'){
            setPrice(e.target.value)
        }
    }
    const handleSubmit = (e) =>{
        e.preventDefault()
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
    }
    return(
        <div>
            {NAME? <h2>Edit Product</h2> : <h2>Add Products</h2>}
            <form onSubmit={handleSubmit}>
                <label>Name</label><br />
                <input type="text" value={name}  name="name" onChange={handleChange} /> <br />
                <label>Price</label><br />
                <input type="text" value={price} name="price" onChange={handleChange} /> <br />
                <input type="submit" value="Add Product" />
            </form>
        </div>
    )
}

export default ProductForm