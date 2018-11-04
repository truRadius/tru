/* tslint:disable */

import * as React from 'react';
// import { routeNode } from 'react-router5';
import {
  StyledComponentProps,
  Theme,
  Paper,
  withStyles,
  WithStyles,
  withTheme,
  WithTheme,
  TextField,
  Button,
  Grid
} from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import CreateUserModal from '../home/CreateUserModal';

interface StateProps {}

interface DispatchProps {}

interface InternalState {}

const styles = (theme: Theme): { [key: string]: CSSProperties } => ({
  paper: {
    textAlign: 'center',
    color: '#2E4C63',
    boxShadow: 'none',
    borderRadius: 0,
    backgroundColor: 'transparent'
  },
  root: {
    flexGrow: 1,
    backgroundColor: '#E8E8E8',
    borderRadius: '5%'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  paddingTop: {
    paddingTop: '50px !important'
  }
});

type PropsWithStyles = StateProps &
  DispatchProps &
  WithTheme &
  WithStyles<'root' | 'textField' | 'paper' | 'paddingTop'>;

class Login extends React.PureComponent<PropsWithStyles, InternalState> {
  state = {
    email: '',
    password: ''
  };

  signIn = () => {
    let signInCreds = {
      email: this.state.email,
      password: this.state.password
    };
    alert(`${signInCreds.email} ${signInCreds.password}`);
    //TODO: Alert should be replaced by functionality to check from database if the information matches.
  };

  handleEmail = (e: any) => {
    this.setState({ email: e.target.value });
  };
  handlePassword = (e: any) => {
    this.setState({ password: e.target.value });
  };
  render() {
    const { classes } = this.props;
    return (
      <div>
        <form onSubmit={this.signIn}>
          <Grid container spacing={24}>
            <Grid container spacing={16}>
              <Grid item xs={6}>
                <Paper className={classes.paper}>
                  <TextField
                    id="standard-email"
                    label="Email or Mobile Number"
                    className={classes.textField}
                    value={this.state.email}
                    onChange={this.handleEmail}
                    margin="normal"
                    helperText="forgot password?"
                  />
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper className={classes.paper}>
                  <TextField
                    id="standard-password"
                    label="Password"
                    type="password"
                    className={classes.textField}
                    value={this.state.password}
                    onChange={this.handlePassword}
                    margin="normal"
                  />
                </Paper>
              </Grid>
            </Grid>
            <Grid container spacing={8}>
              <Grid item sm={2} className={classes.paddingTop}>
                <Paper className={classes.paper}>
                  <Button color="primary" type="submit">
                    Log In
                  </Button>
                </Paper>
              </Grid>
              <Grid item sm={2} className={classes.paddingTop}>
                <Paper className={classes.paper}>
                  <CreateUserModal classes={classes} />
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}
type StyledProps = StateProps & DispatchProps & StyledComponentProps<string>;
export const login: React.ComponentType<StyledProps> = withTheme()(withStyles(styles)(Login));
export default login;
