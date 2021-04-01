import React, { useEffect } from 'react'
import { useDispatch} from 'react-redux'
import {startGetproducts} from '../../Actions/productAction'
import ProductForm from './ProductForm' 
import ProductsList from './ProductsList'
//material ui
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
}));
const ProductsContainer = (props) => {
    const dispatch = useDispatch()
    const  classes = useStyles() 

    useEffect(() =>{
        dispatch(startGetproducts())
    },[dispatch])
    
    return (
        <div className={classes.root}>
        <Grid container spacing={2}>
         <Grid item xs={9}>
            <Paper className={classes.paper}><ProductsList /></Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}><ProductForm /></Paper>
          </Grid>
          
        </Grid>
      </div>
    )
}
export default ProductsContainer