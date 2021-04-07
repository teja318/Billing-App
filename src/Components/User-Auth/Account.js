import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {startAccountInfo} from '../../Actions/userAction'


import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';

import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Container } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});
const Account = (props) =>{
  const dispatch = useDispatch()

  const classes = useStyles()
  const user = useSelector((state) =>{
    return state.userDetails
  })
  useEffect(()=>{
    dispatch(startAccountInfo())
  },[dispatch])   
    
  return(
    <Container align="center">
      <Card className={classes.root} >
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Name : {user.username}
            </Typography>
            <Typography variant="h5"  component="h2">
              Email : {user.email}
            </Typography>
            <Typography variant="h5"  component="h2">
              Business Name : {user.businessName}
            </Typography>
            <Typography variant="h5"  component="h2">
              Address : {user.address}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Container>
  )
}
export default Account


