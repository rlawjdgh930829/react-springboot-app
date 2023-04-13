import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Modal } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin: 50,
  },
});

const Avatar = () => {
  const classes = useStyles();
  const [open, setOpen] = useState();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Card className={classes.root}>
        <CardMedia
          component='img'
          alt='User Avatar'
          image='/avatars/avatar0.png'
          title='User Avatar'
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            Username
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            User Info
          </Typography>
        </CardContent>
        <CardActions>
          <Button size='small' color='primary' onClick={handleOpen}>
            Change Avatar
          </Button>
        </CardActions>
      </Card>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        <div>Modal Test</div>
      </Modal>
    </div>
  );
};

export default Avatar;
