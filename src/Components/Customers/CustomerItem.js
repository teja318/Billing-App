import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {startGetRemove} from '../../Actions/customersAction'
import EditCustomer from './EditCustomer'

import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import CardActionArea from '@material-ui/core/CardActionArea'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import ReceiptIcon from '@material-ui/icons/Receipt';
import Link from '@material-ui/core/Link'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import CardHeader from '@material-ui/core/Avatar'

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
const CustomerItem = (props) =>{
    const classes = useStyles()
    const dispatch = useDispatch()
    const {_id, name, email, mobile} = props
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
                        <EditCustomer id = {_id} name = {name} email = {email} mobile ={mobile} handleToggle ={handleToggle}/> 
                    </div>
                ) : (
                    
                    <Card elevation={4} className={classes.root} align="center">
                        <CardActionArea>
                            <CardContent>
                                <Link href={`/customerbills/${_id}`} variant="body2">
                                    <Typography variant="h5" component="h2" className={classes.pos} >
                                        {name}
                                    </Typography>
                                </Link>
                                <Typography variant="h5" component="h2" className={classes.pos}>
                                   Email: {email}
                                </Typography>
                                <Typography variant="h5" component="h2" className={classes.pos} >
                                  Mobile: {mobile}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions align="center">
                            <Button onClick = {handleToggle} color="primary" ><EditIcon fontSize="small"/></Button>  
                            <Button onClick = {handleRemove} color="secondary" ><DeleteIcon fontSize="small"/></Button>
                        </CardActions>
                    </Card>
                )
            }
        </div>
    )
}
export default CustomerItem