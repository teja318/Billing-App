import React from 'react'
import { useSelector } from 'react-redux'

import DeleteIcon from '@material-ui/icons/Delete'
import {Card, CardActionArea, CardActions, CardContent, Button, Typography} from '@material-ui/core';
import {Table, TableBody, TableCell, TableHead, TableRow} from '@material-ui/core';

const BillItem = (props)=>{
    const {_id, date, customer, lineItems } = props
    const customerDetials = useSelector((state) =>{
        return state.customers.find(cus => cus._id === customer)
    })
    const productsName = useSelector((state) => {
        const arr = []
        for(const item of lineItems){
            const res = state.products.find(prod => prod._id === item.product)
            arr.push({...res, ...item})
        }
        return arr
    })
    const totalBill = () => {
        let total = 0
        lineItems.forEach((item) => {
          total += (item.price * item.quantity)
        })
        return total
    }
    return(
        <div>
            <Card elevation={4}>
                <CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                           <b>Name :</b> {customerDetials && customerDetials.name}  
                           
                        </Typography>
                        <Typography >
                            <b>Date :</b> {date} 
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Phn.No : +91 {customerDetials && customerDetials.mobile}
                        </Typography>
                        
                        <Table border="2" size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Quantity</TableCell>
                                    <TableCell>Price(₹)</TableCell>
                                    <TableCell>Total price(₹)</TableCell>
                                </TableRow>
                                
                            </TableHead>
                            <TableBody>
                                {productsName.map((product,i) => {
                                    return (
                                        <TableRow key={i}>
                                            <TableCell>{product.name}</TableCell>
                                            <TableCell>{product.quantity}</TableCell>
                                            <TableCell>{product.price}</TableCell>
                                            <TableCell>{product.subTotal}</TableCell>   
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                            
                         
                          <Typography variant="body2" align="right" color="textSecondary" component="p">
                            <b>Total: ₹{totalBill()}</b>
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      <CardActions>
                        {/* <Button size="small" color="primary" onClick={handleBillBtn} >
                          <Link to="/showBill" >Bill</Link>
                        </Button>
                        <Button size="small" color="secondary" onClick={() => {
                                        handleRemove(_id)
                                    }}>
                          <DeleteIcon fontSize="small"/>
                        </Button> */}
                </CardActions>
            </Card>
        </div>
    )
}
export default BillItem