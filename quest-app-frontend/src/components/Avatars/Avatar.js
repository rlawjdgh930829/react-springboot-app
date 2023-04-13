import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Modal } from '@material-ui/core';
import {
  ListItem,
  List,
  ListItemSecondaryAction,
  Radio,
} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin: 50,
  },
  modal: {
    display: 'flex',
    maxWidth: 200,
  },
});

const Avatar = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(0);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

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
          image={`/avatars/avatar${selectedValue}.png`}
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
        className={classes.modal}
        open={open}
        onClose={handleClose}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        <List dense>
          {[1, 2, 3, 4, 5, 6].map((key) => {
            const labelId = `checkbox-list-secondary-label-${key}`;
            return (
              <ListItem key={key}>
                <CardMedia
                  style={{ maxWidth: 100 }}
                  component='img'
                  alt={`Avatar n°${key}`}
                  image={`/avatars/avatar${key}.png`}
                  title='User Avatar'
                />
                <ListItemSecondaryAction>
                  <Radio
                    edge='end'
                    value={key}
                    onChange={handleChange}
                    checked={'' + selectedValue === '' + key}
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
      </Modal>
    </div>
  );
};

export default Avatar;
