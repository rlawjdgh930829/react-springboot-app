import { Button, InputAdornment, OutlinedInput } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 800,
    textAlign: 'left',
    margin: 20,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  avatar: {
    backgroundColor: red[500],
  },
  link: {
    textDecoration: 'none',
    boxShadow: 'none',
    color: 'white',
  },
}));

const PostForm = (props) => {
  const classes = useStyles();
  const { userId, userName, refreshPosts } = props;

  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const savePost = async () => {
    try {
      const response = await axios.post('/post', {
        title: title,
        text: text,
        userId: userId,
      });

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = () => {
    savePost();
    setTitle('');
    setText('');
    refreshPosts();
  };

  const handleTitle = (value) => {
    setTitle(value);
  };

  const handleText = (value) => {
    setText(value);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Link className={classes.link} to={{ pathname: '/user/' + userId }}>
            <Avatar aria-label='recipe' className={classes.avatar}>
              {userName.charAt(0).toUpperCase()}
            </Avatar>
          </Link>
        }
        title={
          <OutlinedInput
            id='outlined-adornment-amount'
            multiline
            placeholder='title'
            inputProps={{ maxLength: 25 }}
            fullWidth
            value={title}
            onChange={(e) => handleTitle(e.target.value)}
          ></OutlinedInput>
        }
      />
      <CardContent>
        <Typography variant='body2' color='textSecondary' component='div'>
          <OutlinedInput
            id='outlined-adornment-amount'
            multiline
            placeholder='text'
            inputProps={{ maxLength: 250 }}
            fullWidth
            value={text}
            onChange={(e) => handleText(e.target.value)}
            endAdornment={
              <InputAdornment position='end'>
                <Button
                  variant='contained'
                  color='primary'
                  onClick={handleSubmit}
                >
                  POST
                </Button>
              </InputAdornment>
            }
          ></OutlinedInput>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PostForm;
