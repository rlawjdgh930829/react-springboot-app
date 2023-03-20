import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Collapse from '@material-ui/core/Collapse';
import { red } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CommentIcon from '@material-ui/icons/Comment';
import FavoriteIcon from '@material-ui/icons/Favorite';
import axios from 'axios';
import clsx from 'clsx';
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

const Post = (props) => {
  const { id, title, text, userId, userName } = props.post;

  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const [liked, setLiked] = useState(false);
  const [commentList, setCommnetList] = useState([]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
    commnets();
    console.log(commentList);
  };

  const handleLike = () => {
    setLiked(!liked);
  };

  const commnets = () => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/comment?postId=' + id);
        setCommnetList(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
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
        title={title}
      />
      <CardContent>
        <Typography variant='body2' color='textSecondary' component='p'>
          {text}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton onClick={handleLike} aria-label='add to favorites'>
          <FavoriteIcon style={liked ? { color: 'red' } : null} />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label='show more'
        >
          <CommentIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <CardContent></CardContent>
      </Collapse>
    </Card>
  );
};

export default Post;
