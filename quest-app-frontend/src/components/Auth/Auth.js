import { Button, FormControl, TextField } from '@material-ui/core';
import axios from 'axios';
import React, { useState } from 'react';

const Auth = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsername = (value) => {
    setUsername(value);
  };

  const handlePassword = (value) => {
    setPassword(value);
  };

  const handelRegister = () => {
    sendRequest('register');
  };

  const handelLogin = () => {
    sendRequest('login');
    setUsername('');
    setPassword('');
    window.location.href = '/';
  };

  const sendRequest = async (path) => {
    try {
      const response = await axios.post('/auth/' + path, {
        userName: username,
        password: password,
      });
      console.log(response.data);
      localStorage.setItem('tokenKey', response.data.message);
      localStorage.setItem('currentUser', response.data.userId);
      localStorage.setItem('userName', username);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FormControl>
      <TextField
        label='username'
        value={username}
        onChange={(e) => handleUsername(e.target.value)}
      />
      <TextField
        label='password'
        value={password}
        onChange={(e) => handlePassword(e.target.value)}
      />
      <Button
        color='primary'
        variant='contained'
        style={{ marginTop: 10, color: 'white' }}
        onClick={() => handelRegister()}
      >
        Register
      </Button>
      <Button
        color='primary'
        variant='contained'
        style={{ marginTop: 10, color: 'white' }}
        onClick={() => handelLogin()}
      >
        Login
      </Button>
    </FormControl>
  );
};

export default Auth;
