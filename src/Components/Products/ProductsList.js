import React, { useState } from 'react'
import {useSelector} from 'react-redux'
import ProductItem from './ProductItem'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import SearchIcon from '@material-ui/icons/Search'

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
            <h2>Products List -{products.length}</h2>
            <TextField  
                style={{width: '30%', marginBottom : '25px'}}
                variant="outlined"
                size="small"
                type = "text" 
                // placeholder = `<SearchIcon /> Search by name...`
                onChange = {handleChange} 
                value = {search}
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