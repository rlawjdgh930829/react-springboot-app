import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Post = () => {
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
      <ul>
        {postList.map((post) => (
          <li key={post.id}>
            {post.title} {post.text}
          </li>
        ))}
      </ul>
    );
  }
};

export default Post;
