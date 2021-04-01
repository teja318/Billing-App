import React,{useState} from 'react';
import {useSelector} from 'react-redux'

import {Autocomplete} from '@material-ui/lab'
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid'
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
  const [date, setDate] = useState('')
  const [customer, setCustomer] = useState('')
  const [product, setProduct] = useState('')

  const customers = useSelector((state) => {
    return state.customers
  })

  const products = useSelector((state) => {
    return state.products
  })

  const handleDateChange= (e) =>{
    setDate(e.target.value)
  }
  const handleCustomerChange =(e, param) => {
    console.log(param)
    if(param){
      setCustomer(param._id )
    }
  }
  const handleProductChange =(e, param) => {
    console.log(param)
    if(param){
      setCustomer(param._id )
    }
  }

  return (
    <div>
      <form className={classes.container} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField
              label="Date of purchase"
              type="date"
              value={date}
              onChange={handleDateChange}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />    
            <Autocomplete
              options={customers}
              getOptionLabel={(customer) => customer.name}
              onChange={handleCustomerChange}
              className={classes.textField}
              style={{width:"194px", marginTop: '20px'}}
              renderInput={(params) => (
                <TextField {...params} label="customer" variant="outlined" fullWidth />
              )}
            />
            <Autocomplete
              options={products}
              getOptionLabel={(product) => product.name}
              onChange={handleProductChange}
              className={classes.textField}
              style={{width:"194px", marginTop: '20px'}}
              renderInput={(params) => (
                <TextField {...params} label="product" variant="outlined" fullWidth />
              )}
            />
            
          </Grid>
        </Grid>
      </form>
    </div>
  )
}
export default BillForm