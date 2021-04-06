import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {startAccountInfo} from '../../Actions/accountAction'


import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button'
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
        </CardContent>
      </CardActionArea>
      <CardActions>
        {/* <Button size="small" color="primary">
          Learn More
        </Button> */}
      </CardActions>
    </Card>
    </Container>
  )
}
export default Account


