import React, { useState } from 'react'
import {useSelector} from 'react-redux'
import ProductItem from './ProductItem'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import SearchIcon from '@material-ui/icons/Search'
import InputAdornment from "@material-ui/core/InputAdornment"
const ProductsList = (props) =>{
    const[search, setSearch] = useState('')
    const products = useSelector((state) =>{
        return state.products
    })

    //search functionality
    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    const productsData = products.filter((product)=>{
        return product.name.toLowerCase().match(search.toLowerCase())
    })
    return (
        <div>
            <h2 style={{color: "blue"}} >Products List</h2>
            <TextField  
                style={{width: '30%', marginBottom : '25px'}}
                variant="outlined"
                size="small"
                type = "text" 
                placeholder = 'Search by name...'
                onChange = {handleChange} 
                value = {search}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                           <SearchIcon />
                        </InputAdornment>
                    ),
                }}
  
            />
            <Grid container spacing={2} style={{overflowY : 'scroll', maxHeight : '400px'}} >
                {productsData.map((product, i) => {
                    return (
                        <Grid item xs={4} key={i}>
                            <ProductItem  {...product} />
                        </Grid>
                    )
                })}
            </Grid>
        </div>
    )
}
export default ProductsList