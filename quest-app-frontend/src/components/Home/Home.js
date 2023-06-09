import React, { useEffect, useState } from 'react';
import Post from '../Post/Post';
import axios from 'axios';
import { Container, makeStyles } from '@material-ui/core';
import PostForm from '../Post/PostForm';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f5ff',
  },
}));

const Home = () => {
  const classes = useStyles();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [postList, setPostList] = useState([]);

  const refreshPosts = () => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/post');
        setIsLoaded(true);
        setPostList(response.data);
        console.log(response.data);
      } catch (error) {
        setIsLoaded(true);
        setError(error);
      }
    };
    fetchData();
  };

  useEffect(() => {
    refreshPosts();
  }, []);

  if (error) {
    return <div>Error</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <Container fixed className={classes.container}>
        {localStorage.getItem('currentUser') == null ? (
          ''
        ) : (
          <PostForm
            userId={localStorage.getItem('currentUser')}
            userName={localStorage.getItem('userName')}
            refreshPosts={refreshPosts}
          />
        )}

        {postList.map((post) => (
          <Post key={post.id} post={post} like={post.postLikes}></Post>
        ))}
      </Container>
    );
  }
};

export default Home;
