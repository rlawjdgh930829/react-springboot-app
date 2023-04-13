import React from 'react';
import { useParams } from 'react-router-dom';
import Avatar from '../Avatars/Avatar';

const User = () => {
  const { userId } = useParams();

  return (
    <div>
      User: {userId}
      <Avatar />
    </div>
  );
};

export default User;
