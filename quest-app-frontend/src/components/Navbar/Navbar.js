import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  const classes = useStyles();
  const navigate = useNavigate();

  const handelLogout = () => {
    localStorage.clear();
    navigate(0);
  };

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
            {localStorage.getItem('currentUser') == null ? (
              <Link className={classes.link} to='/auth'>
                Login / Register
              </Link>
            ) : (
              <div>
                <Link
                  className={classes.link}
                  to={{
                    pathname: '/user/' + localStorage.getItem('currentUser'),
                  }}
                >
                  Profile
                </Link>
                {' / '}
                <Link className={classes.link} onClick={() => handelLogout()}>
                  Logout
                </Link>
              </div>
            )}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
