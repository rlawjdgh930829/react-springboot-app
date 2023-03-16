import React, { useEffect, useState } from 'react';
import Post from '../Post/Post';
import axios from 'axios';

const Home = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    axios
      .get('/post')
      .then((res) => res.data)
      .then((result) => {
        setIsLoaded(true);
        setPostList(result);
      })
      .catch((error) => {
        setIsLoaded(true);
        setError(error);
      });
  }, []);

  if (error) {
    return <div>Error</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        Home
        {postList.map((post) => (
          <li key={post.id}>
            <Post title={post.title} text={post.text}></Post>
          </li>
        ))}
      </div>
    );
  }
};

export default Home;
