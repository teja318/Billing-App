import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {startGetRemove} from '../../Actions/productAction'
import EditProduct from './EditProduct'

import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import CardActionArea from '@material-ui/core/CardActionArea'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'

const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
});

const ProductItem = (props) =>{
    const dispatch = useDispatch()
    const classes = useStyles()
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
                    </div>
                ) : (
                    <Card elevation={4} className={classes.root} align="center">
                        <CardActionArea>
                            <CardContent>
                                {/* <Typography className={classes.title} color="textSecondary" gutterBottom>
                                    Word of the Day
                                </Typography> */}
                                <Typography variant="h5" component="h2">
                                   Name: {name}
                                </Typography>
                                <Typography variant="h5" component="h2" className={classes.pos} color="textSecondary">
                                  Price: {price}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button onClick = {handleToggle} color="primary" align="right"  ><EditIcon fontSize="small"/></Button>  
                            <Button onClick = {handleRemove} color="secondary" edge="end" ><DeleteIcon fontSize="small"/></Button>
                        </CardActions>
                    </Card>
                    
                )
            }
        </div>
    )
}
export default ProductItem