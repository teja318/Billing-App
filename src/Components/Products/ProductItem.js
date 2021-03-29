import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {startGetRemove} from '../../Actions/productAction'
import EditProduct from './EditProduct'
const ProductItem = (props) =>{
    const dispatch = useDispatch()
    const {_id, name, price} = props
    const [toggle, setToggle] = useState(false)
    const handleRemove =() =>{
        const conformation = window.confirm(`Are you sure to remove the ${name} from the list `)
        if(conformation){
            dispatch(startGetRemove(_id))
        }
    }
    const handleToggle = () =>{
        setToggle(!toggle)
    }
    return(
        <div>
            {
                toggle? (
                    <div>
                        <EditProduct id = {_id} name = {name} price = {price} handleToggle ={handleToggle}/> 
                        <button onClick ={handleToggle}>Cancel</button>
                    </div>
                ) : (
                    <div>
                        <blockquote>
                        <h4>Name : {name}</h4>
                        <p>Price : {price}</p>
                        <button onClick = {handleRemove} >remove</button>  <b> | </b>
                        <button onClick = {handleToggle} >Edit</button>
                        </blockquote>
                    </div>
                )
            }
            
            {/* <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>buttons</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{name}</td>
                        <td>{price}</td>
                        <td><button onClick = {() =>{handleRemove(_id)}} >remove</button></td>
                    </tr>
                 </tbody>
                
            </table> */}

        </div>
    )
}
export default ProductItem