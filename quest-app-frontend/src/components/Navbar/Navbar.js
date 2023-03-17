import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textAlign: 'left',
  },
  link: {
    textDecoration: 'none',
    boxShadow: 'none',
    color: 'white',
  },
}));

const Navbar = () => {
  const userId = 6;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            <Link className={classes.link} to='/'>
              Home
            </Link>
          </Typography>
          <Typography variant='h6'>
            <Link className={classes.link} to={{ pathname: '/user/' + userId }}>
              User
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
