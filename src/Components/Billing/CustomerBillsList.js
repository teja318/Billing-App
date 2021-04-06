import React,{useEffect} from 'react'
import { useSelector, useDispatch} from 'react-redux'
import {startGetCustomers} from '../../Actions/customersAction'
import {startGetproducts} from '../../Actions/productAction'
import {Card, CardActions, Button, CardContent, Container, Grid, Typography} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import {Table, TableBody, TableCell, TableHead, TableRow} from '@material-ui/core';
import { Link } from 'react-router-dom'
import PrintIcon from '@material-ui/icons/Print'

const useStyles = makeStyles((theme)=>({
    root : {
        width : '100vw',
        height : '60vh',
        paddingTop: theme.spacing(5)
    } ,
    paper: {
        padding: theme.spacing(1) }
}))

export default function CustomerBillsList(props) {
    const {_id,date,customer,lineItems} = props
    const dispatch = useDispatch()
    const classes = useStyles()
    useEffect(()=>{
        dispatch(startGetproducts())
        dispatch(startGetCustomers())
    }, [dispatch])
    
    // customer Name
    const customerName = useSelector((state)=>{
        return state.customers.find(ele=>ele._id === customer)
    })
    // products Name
    const productName = useSelector((state)=>{
        const result = []
        for(const item of lineItems){
            const productItem = state.products.find(ele=>ele._id === item.product)
            result.push({...productItem , ...item})
        }  
        return result
    })
    const totalBill = () => {
        let total = 0
        lineItems.forEach((item) => {
          total += (item.price * item.quantity)
        })
        return total
    }
    
    return (
        <div>
            <Container elevation ={4} className ={classes.root}>
                <Grid container spacing={2}>
                    <Grid item >
                        <Card className = {classes.paper}>
                            <CardContent>
                                <Typography variant ="h5">Customer : {customerName && customerName.name}</Typography>
                                <Typography variant ='subtitle1'>Date : {date}</Typography>
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
                                        {productName.map((product,i) => {
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
                            <CardActions>
                                <Button component={Link} to="/customers" variant="contained" color="secondary"  >
                                    Back
                                </Button>
                                <Button variant="contained" 
                                   color="primary" 
                                   startIcon={<PrintIcon/>}
                                   onClick={() => {window.print()}} >
                                    Print Bill
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    
                </Grid> 
                
            </Container >
            
        </div>
    )
}
