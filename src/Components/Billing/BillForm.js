import React,{useState} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {addItem, resetItems , incrementQuantity, decrementQuantity, removeItem} from '../../Actions/lineItemsAction'
import {startAddBill} from '../../Actions/billsAction'

import {Autocomplete} from '@material-ui/lab'
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
//import Typography from '@material-ui/core/Typography'
import CardActionArea from '@material-ui/core/CardActionArea'
import Grid from '@material-ui/core/Grid'
import AddCircleSharpIcon from '@material-ui/icons/AddCircleSharp';
import RemoveCircleSharpIcon from '@material-ui/icons/RemoveCircleSharp';
import CancelSharpIcon from '@material-ui/icons/CancelSharp';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  }
}));

const BillForm = (props) =>{
  const classes = useStyles()
  const dispatch = useDispatch()
  const [date, setDate] = useState('')
  const [customer, setCustomer] = useState('')
  const [product, setProduct] = useState('')

  const customers = useSelector((state) => {
    return state.customers
  })

  const products = useSelector((state) => {
    return state.products
  })

  const lineItems = useSelector((state) =>{
    return state.lineItems
  })

  const handleDateChange= (e) =>{
    setDate(e.target.value)
  }
  const handleCustomerChange =(e, param) => {
    //console.log(e.target.value)
    if(param){
      setCustomer(param._id )
    }else{
      setCustomer('')
    }
  }
  const handleProductChange =(e, param) => {
    //console.log(param)
    if(param){
      setProduct(param._id )
      itemGenerator(param)
    }else{
      setProduct('')
    }
  }
  const itemGenerator = (item) => {
    let quantity = 1
    const itemObj = {
      '_Id' : new Date(),
      'productName' : item.name,
      'price' : item.price,
      'product' : item._id,
      'quantity' : quantity,
      'subTotal' : quantity * item.price
    }
    dispatch(addItem(itemObj))
  }
  
  const handleDecre = (id) => {
    dispatch(decrementQuantity(id))
  }

  const handleIncre = (id) => {
    dispatch(incrementQuantity(id))
  }

  const handleRemove = (id) => {
    dispatch(removeItem(id))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = {
      "date" : date ,
      "customer" : customer,
      "lineItems" : lineItems
    }

    dispatch(startAddBill(formData))
    setDate('')
    setCustomer('')
    setProduct('')
    dispatch(resetItems())
    
  }
  const totalBill = () => {
    let total = 0
    lineItems.forEach((item) => {
      total += (item.price * item.quantity)
    })
    return total
  }
  
  return (
    <div>
      <form className={classes.container} onSubmit={handleSubmit} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField
              label="Date of purchase"
              type="datetime-local"
              value={date}
              onChange={handleDateChange}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />    
            <Autocomplete
              //options={customers}
              // getOptionLabel={(customer) => customer.name}
              options={customers.map((option) => option? option.name : "")}
              onChange={handleCustomerChange}
              className={classes.textField}
              style={{width:"194px", marginTop: '20px'}}
              renderInput={(params) => (
                <TextField {...params} label="customer" variant="outlined" fullWidth />
              )}
              
            />
            <Autocomplete
              options={products}
              getOptionLabel={(product) => (product? product.name : "" )}
              onChange={handleProductChange}
              className={classes.textField}
              style={{width:"194px", marginTop: '20px'}}
              renderInput={(params) => (
                <TextField {...params} label="product" variant="outlined" fullWidth />
              )}
              
            />
            
          </Grid>
          <Grid item xs={12} style={{marginTop: '20px'}}> 
            <Button type="submit" size="small" variant="contained" color="primary"> add </Button>
          </Grid>
          
        </Grid>
      </form>

      <Grid item style={{overflowY : lineItems.length > 0 && 'scroll' , maxHeight : '400px'}}>
        {lineItems.map((item, i) => { 
          return( 
            <Card elevation={4} className={classes.root} key={i}>
              <CardActionArea>
                <CardContent>
                  {item.productName} - <b>₹{item.price}</b>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary"
                    onClick={() => {handleDecre(item._Id)}}> <RemoveCircleSharpIcon /> 
                  </Button>
                  {item.quantity}
                  <Button size="small" color="primary"
                    onClick={() => {handleIncre(item._Id)}}> <AddCircleSharpIcon />
                  </Button>
                  ₹{item.quantity * item.price}
                  <Button size="small" color="secondary"
                    onClick={() => {handleRemove(item._Id)}} > <CancelSharpIcon /> 
                  </Button>
                </CardActions>
              </CardActionArea>
            </Card >
            
          )
        })}
        {lineItems.length > 0 ? `Total: ₹${totalBill()}` : '' }
      </Grid>
    </div>
  )
}
export default BillForm