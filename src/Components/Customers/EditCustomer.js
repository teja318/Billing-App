import React from 'react'
import CustomerForm from './CustomerForm'

export default function EditProduct(props){
    const {id , name , email , mobile, handleToggle} = props
    return (
        <div>
            <CustomerForm id = {id} name ={name} email ={email} mobile={mobile} handleToggle = {handleToggle}/>
        </div>
    )
}