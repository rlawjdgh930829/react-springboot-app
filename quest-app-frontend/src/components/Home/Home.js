import React, { useEffect, useState } from 'react';
import Post from '../Post/Post';
import axios from 'axios';

const Home = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [postList, setPostList] = useState([]);

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
      <div>
        Home
        {postList.map((post) => (
          <Post title={post.title} text={post.text}></Post>
        ))}
      </div>
    );
  }
};

export default Home;
