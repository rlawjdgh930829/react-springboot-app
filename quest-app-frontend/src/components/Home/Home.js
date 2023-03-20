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

  const refreshPosts = (post) => {
    setPostList([...postList, post]);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/post');
        setIsLoaded(true);
        setPostList(response.data);
      } catch (error) {
        setIsLoaded(true);
        setError(error);
      }
    };
    fetchData();
  }, []);

  if (error) {
    return <div>Error</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <Container fixed className={classes.container}>
        <PostForm userId={1} userName={'user1'} refreshPosts={refreshPosts} />
        {postList.map((post) => (
          <Post
            key={post.id}
            userId={post.userId}
            userName={post.userName}
            title={post.title}
            text={post.text}
          ></Post>
        ))}
      </Container>
    );
  }
};

export default Home;
