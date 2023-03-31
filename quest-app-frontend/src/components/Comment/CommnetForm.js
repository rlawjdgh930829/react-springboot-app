import {
  Avatar,
  Button,
  CardContent,
  InputAdornment,
  makeStyles,
  OutlinedInput,
} from '@material-ui/core';
import axios from 'axios';
import React, { useState } from 'react';
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

const CommentForm = (props) => {
  const { userId, userName, postId, refreshCommnets } = props;
  const classes = useStyles();

  const [text, setText] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        '/comment',
        {
          postId: postId,
          userId: userId,
          text: text,
        },
        {
          headers: {
            Authorization: localStorage.getItem('tokenKey'),
          },
        }
      );
      console.log(response.data);
      setText('');
      refreshCommnets();
    } catch (error) {
      console.log(error);
    }
  };

  const handleTextChange = (value) => {
    setText(value);
  };

  return (
    <CardContent className={classes.comment}>
      <OutlinedInput
        id='outlined-adornment-amount'
        multiline
        inputProps={{ maxLength: 250 }}
        fullWidth
        value={text}
        onChange={(e) => handleTextChange(e.target.value)}
        startAdornment={
          <InputAdornment position='start'>
            <Link className={classes.link} to={{ pathname: '/user/' + userId }}>
              <Avatar aria-label='recipe' className={classes.small}>
                {userName.charAt(0).toUpperCase()}
              </Avatar>
            </Link>
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment position='end'>
            <Button variant='contained' color='primary' onClick={handleSubmit}>
              COMMENT
            </Button>
          </InputAdornment>
        }
        style={{ color: 'black', backgroundColor: 'white' }}
      ></OutlinedInput>
    </CardContent>
  );
};

export default CommentForm;
