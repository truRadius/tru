/* tslint:disable */

import * as React from 'react';
import axios from 'axios';
import {
  StyledComponentProps,
  Theme,
  // Paper,
  withStyles,
  WithStyles,
  withTheme,
  WithTheme,
  // TextField,
  Button,
  Grid,
  InputBase,
  MuiThemeProvider,
  FormControl,
  createMuiTheme,
  Typography,
} from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import CreateUserModal from './CreateUserModal';

interface StateProps {}

interface DispatchProps {}

interface InternalState {}

const styles = (theme: Theme): { [key: string]: CSSProperties } => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#E8E8E8',
    borderRadius: '5%'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  paddingTop: {
    paddingTop: '50px !important'
  },
  input: {
    paddingTop: 4,
    paddingRight: theme.spacing.unit,
    paddingBottom: 4,
    paddingLeft: 20,
    transition: theme.transitions.create('width'),
    width: '100%',
    border: '1px solid #2E4C63',
    borderRadius: 40,
    backgroundColor: 'white'
  },
  formControl: {
    minWidth: 120,
    width: '30%',
    maxWidth: 1000,
    paddingRight: 10
  },
});

const themeAlt = createMuiTheme({
  palette: {
    primary: {
      main: '#ffffff'
    }
  }
});

type PropsWithStyles = StateProps & DispatchProps & WithTheme & WithStyles<
'root' | 
'textField' | 
'paddingTop' |
'input' |
'formControl'
>;
interface StateProps {
  isLoggedIn: any;
}
class InternalLogin extends React.PureComponent<PropsWithStyles, InternalState> {
  state = {
    email: '',
    password: '',
    err: ''
  };

  validateEmailOrPhoneNUmber = () => {
    let phoneNumberRegex = /\d{10}/;
    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    console.log(emailRegex.test(this.state.email));
    if (emailRegex.test(this.state.email) === true || phoneNumberRegex.test(this.state.email) === true) {
      this.setState({ err: '' });
    } else {
      this.setState({ err: 'Invalid email or Phone Number' });
    }
  };

  signIn = (e: any) => {
    e.preventDefault();
    if (this.state.email !== '' && this.state.password !== '' && this.state.err === '') {
      axios
        .post('http://localhost:8000/api/signin', { email: this.state.email, password: this.state.password })
        .then(response => {
          console.log(response);
          if (response.data.token === false) {
            this.setState({ err: response.data.message });
          } else {
            this.setState({ err: '' });
            sessionStorage.setItem('UserObj', response.data.token);
            this.props.isLoggedIn();
          }
        })
        .catch(() => {
          this.setState({ err: 'Invalid login credentials', email: '', password: '' });
        });
      // TODO: Alert should be replaced by functionality to check from database if the information matches.
    }
  };

  // tslint:disable-next-line:no-any
  handleEmail = (e: any) => {
    this.setState({ email: e.target.value });
  };
  // tslint:disable-next-line:no-any
  handlePassword = (e: any) => {
    this.setState({ password: e.target.value });
  };
  render() {
    const { classes } = this.props;
    return (
      <div style={{ width: '-webkit-fill-available' }}>
        <form onSubmit={this.signIn}>
          <Grid container alignItems="center" justify="flex-end" spacing={24}>
            <Grid item xs container justify="flex-end" alignItems="center">
              <FormControl className={classes.formControl}>
                <InputBase
                  fullWidth
                  id="username"
                  placeholder="Email or Mobile Number"
                  value={this.state.email}
                  onBlur={this.validateEmailOrPhoneNUmber}
                  onChange={this.handleEmail}
                  classes={{
                    input: classes.input,
                  }}
                />
                <Typography variant='caption' style={{color: 'white'}}>
                  {this.state.err}
                </Typography>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputBase
                  fullWidth
                  id="password"
                  placeholder="Password"
                  type="password"
                  value={this.state.password}
                  onChange={this.handlePassword}
                  classes={{
                    input: classes.input,
                  }}
                />
              </FormControl>
              <MuiThemeProvider theme={themeAlt}>
                <Button color="primary" type="submit">
                  Log In
                </Button>
              </MuiThemeProvider>
              <CreateUserModal classes={classes} isLoggedIn={this.props.isLoggedIn} />
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}
type StyledProps = StateProps & DispatchProps & StyledComponentProps<string>;
export const login: React.ComponentType<StyledProps> = withTheme()(withStyles(styles)(InternalLogin));
export default login;
