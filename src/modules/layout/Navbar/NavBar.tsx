/* tslint:disable */ //toavoid unnecessary semicolon errors

import * as React from 'react';
import {
  StyledComponentProps,
  Theme,
  withStyles,
  WithStyles,
  withTheme,
  WithTheme,
  AppBar,
  Toolbar,
  Avatar,
  Menu,
  MenuItem,
  IconButton
} from '@material-ui/core';

import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import Login from './login';
import { Link } from 'react-router-dom';

const logo = require('../logo.png');

interface StateProps {}

interface DispatchProps {}

interface InternalState {}

const styles = (theme: Theme): { [key: string]: CSSProperties } => ({
  root: {
    width: '100%'
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  title: {
    marginLeft: -12,
    marginRight: 20,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  search: {
    position: 'relative',
    border: '1px solid #686868',
    borderRadius: 20,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto'
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 6,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#686868'
  },
  inputRoot: {
    color: '#686868',
    width: '100%'
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 6,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200
    }
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  icons: {
    color: '#686868'
  },
  container: {
    width: '80%',
    margin: '0 auto'
  }
});

type PropsWithStyles = StateProps &
  DispatchProps &
  WithTheme &
  WithStyles<
    | 'button'
    | 'root'
    | 'grow'
    | 'menuButton'
    | 'title'
    | 'search'
    | 'searchIcon'
    | 'inputRoot'
    | 'inputInput'
    | 'sectionDesktop'
    | 'sectionMobile'
    | 'icons'
    | 'container'
    | 'paper'
  >;

interface StateProps {
  isLoggedIn: any;
  loggedIn: boolean;
}
class InternalNavBar extends React.PureComponent<PropsWithStyles, InternalState> {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
    open: false,
    errStack: [],
    loggedIn: this.props.loggedIn
  };

  componentDidMount = () => {
    //TODO: Replace this login with actual logic to check if user is logged in
    this.props.isLoggedIn();
  };

  // tslint:disable-next-line:no-any
  handleProfileMenuOpen = (event: any) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  // tslint:disable-next-line:no-any
  handleMobileMenuOpen = (event: any) => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  handleOpenModal = () => {
    this.setState({ open: true });
  };

  render() {
    const { anchorEl, mobileMoreAnchorEl } = this.state;
    const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem>Profile</MenuItem>
        <MenuItem>My account</MenuItem>
      </Menu>
    );

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={this.handleMobileMenuClose}
      >
        <MenuItem onClick={this.handleProfileMenuOpen}>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    );

    return (
      <div className={classes.root}>
        <AppBar position="static" style={{ backgroundColor: 'white', boxShadow: 'none' }}>
          <Toolbar className={classes.container}>
            <Link to="/">
              <Avatar alt="truRadius Logo" src={logo} className={classes.title} />
            </Link>
            {this.props.loggedIn ? (
              <div>
                {/* TODO: This will eventually change to profile/:id for particular user */}
                <Link to="/profile">
                  <IconButton color="inherit">
                    <AccountCircle />
                  </IconButton>
                </Link>
              </div>
            ) : (
              <Login classes={classes} isLoggedIn={this.props.isLoggedIn} />
            )}
            <div className={classes.grow} />
            <div className={classes.sectionDesktop} />
            <div className={classes.sectionMobile}>
              <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                <MoreIcon className={classes.icons} />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMenu}
        {renderMobileMenu}
      </div>
    );
  }
}

type StyledProps = StateProps & DispatchProps & StyledComponentProps<string>;
export const NavBar: React.ComponentType<StyledProps> = withTheme()(withStyles(styles)(InternalNavBar));
