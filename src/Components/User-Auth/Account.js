import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {startAccountInfo} from '../../Actions/accountAction'
const Account = (props) =>{
    const dispatch = useDispatch()
    const user = useSelector((state) =>{
        return state.userDetails
    })
    useEffect(()=>{
        dispatch(startAccountInfo())
    },[dispatch])   
    return(
        <div>
            <h2>User Profile</h2>
            <h3>User Name :{user.username}</h3>
            <h3>User email :{user.email}</h3>
        </div>
    )
}
export default Account