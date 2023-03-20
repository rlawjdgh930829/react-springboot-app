import {
  Avatar,
  CardContent,
  InputAdornment,
  makeStyles,
  OutlinedInput,
} from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  comment: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'cetner',
  },
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  link: {
    textDecoration: 'none',
    boxShadow: 'none',
    color: 'white',
  },
}));

const Comment = (props) => {
  const { text, userId, userName } = props;
  const classes = useStyles();

  return (
    <CardContent className={classes.comment}>
      <OutlinedInput
        disabled
        id='outlined-adornment-amount'
        multiline
        inputProps={{ maxLength: 25 }}
        fullWidth
        value={text}
        startAdornment={
          <InputAdornment position='start'>
            <Link className={classes.link} to={{ pathname: '/user/' + userId }}>
              <Avatar aria-label='recipe' className={classes.small}>
                {userName.charAt(0).toUpperCase()}
              </Avatar>
            </Link>
          </InputAdornment>
        }
        style={{ color: 'black', backgroundColor: 'white' }}
      ></OutlinedInput>
    </CardContent>
  );
};

export default Comment;
