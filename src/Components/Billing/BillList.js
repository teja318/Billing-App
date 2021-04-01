import React  from 'react'
import { useSelector } from 'react-redux'
const BillList = (props) =>{
    
    const bills = useSelector((state) =>{
        return state.bills
    })

    return (
        <div>
            <h2>Bills</h2>

        </div>
    )
}
export default BillList