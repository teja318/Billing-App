import React from 'react'
import {useSelector} from 'react-redux'
import ProductItem from './ProductItem'
const ProductsList = (props) =>{
    const products = useSelector((state) =>{
        return state.products
    })
    return (
        <div>
            <h2>Products List -{products.length}</h2>
            {
                products.map((ele, i) =>{
                    return <ProductItem key={i} {...ele}/>
                })                
            }
        </div>
    )
}
export default ProductsList