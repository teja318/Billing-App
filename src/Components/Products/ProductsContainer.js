import React, { useEffect } from 'react'
import { useDispatch} from 'react-redux'
import {startGetproducts} from '../../Actions/productAction'
import ProductForm from './ProductForm' 
import ProductsList from './ProductsList'
const ProductsContainer = (props) => {
    const dispatch = useDispatch()
        
    useEffect(() =>{
        dispatch(startGetproducts())
    },[dispatch])
    
    return (
        <div>
            <ProductForm />
            <ProductsList />

        </div>
    )
}
export default ProductsContainer