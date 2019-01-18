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
  IconButton,
  Grid,
  FormControl,
  InputBase,
  Tooltip
} from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AddCircle from '@material-ui/icons/AddCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import Login from './login';
import { Link } from 'react-router-dom';
import { updateSearchTerms, fetchOrganizations } from 'src/actions/searchActions';
import { connect } from 'react-redux';
import { SearchState } from 'src/reducers';
import { SearchBody } from 'src/api/searchBody';

const logo = require('../logo.png');

interface Props {
  body: SearchBody;
  onUpdateSearchTerms: typeof updateSearchTerms;
  onFetchOrganizations: typeof fetchOrganizations;
  isLoggedIn: () => void;
  loggedIn: boolean;
}

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
    paddingTop: 4,
    paddingRight: theme.spacing.unit,
    paddingBottom: 4,
    paddingLeft: 20,
    transition: theme.transitions.create('width'),
    width: '100%',
    border: '1px solid #2E4C63',
    borderRadius: 40,
    backgroundColor: 'white',
    justifyContent: 'space-evenly',
  },
  formControl: {
    minWidth: 120,
    width: '100%',
    justifyContent: 'space-evenly',
    color: 'white'
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
    margin: '0 auto',
    maxWidth: 1000
  }
});

type PropsWithStyles = Props &
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
    | 'formControl'
  >;

class InternalNavBar extends React.PureComponent<PropsWithStyles> {
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

  handleChange = (event: any) => {
    const { onUpdateSearchTerms } = this.props;
    
    onUpdateSearchTerms(event.target.value);
  }

  onSubmit = (e: any) => {
    e.preventDefault();
    const { onFetchOrganizations, body } = this.props;

    onFetchOrganizations(body);
  }

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
        <AppBar position="static" style={{ backgroundColor: '#2E4C63', boxShadow: 'none' }}>
          <Toolbar className={classes.container}>
            <Grid container alignItems="center">
              <Grid item md={4}>
                <Link to="/">
                  <Avatar alt="truRadius Logo" src={logo} className={classes.title} />
                </Link>
              </Grid>
              {this.props.loggedIn ? (
                <>
                <Grid item md={4}>
                  <form onSubmit={this.onSubmit}>
                    <FormControl className={classes.formControl}>
                      <InputBase
                        name="search_terms"
                        fullWidth
                        placeholder="Search"
                        classes={{ input: classes.inputInput }}
                        onChange={this.handleChange}
                      />
                    </FormControl>
                  </form>
                </Grid>
                <Grid item md={4} container justify="flex-end" alignItems="center">
                  <Link to={`/event`}>
                    <Tooltip title="Create Event" aria-label="Create Event">
                      <IconButton>
                        <AddCircle style={{ color: 'white' }} />
                      </IconButton>
                    </Tooltip>
                  </Link>
                  <Link to={`/profile/${sessionStorage.UserObj ? sessionStorage.UserObj : localStorage.UserObj}`}>
                    <Tooltip title="View Profile" aria-label="View Profile">
                      <IconButton>
                        <AccountCircle style={{ color: 'white' }} />
                      </IconButton>
                    </Tooltip>
                  </Link>
                </Grid>
                </>
                ) : (
                  <Grid item md>
                    <Login classes={classes} isLoggedIn={this.props.isLoggedIn} />
                  </Grid>
                )}
            </Grid>
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

type StyledProps = Props & StyledComponentProps<string>;
export const NavBar: React.ComponentType<StyledProps> = withTheme()(withStyles(styles)(InternalNavBar));
export default connect(
  (state: SearchState) => ({
    body: state.searchReducer.body,
  }),
  { 
    onUpdateSearchTerms: updateSearchTerms,
    onFetchOrganizations: fetchOrganizations,
  }
)(NavBar);