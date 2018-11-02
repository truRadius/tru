import * as React from 'react';
import { routeNode } from 'react-router5';
import {
  StyledComponentProps,
  Theme,
  withStyles,
  WithStyles,
  withTheme,
  WithTheme,
  TextField,
  Button
} from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';

interface StateProps {}

interface DispatchProps {}

interface InternalState {}

const styles = (theme: Theme): { [key: string]: CSSProperties } => ({
  root: {}
});

type PropsWithStyles = StateProps & DispatchProps & WithTheme & WithStyles<'root'>;

class InternalHome extends React.PureComponent<PropsWithStyles, InternalState> {
  state = {
    email: '',
    password: ''
  };

  render() {
    return (
      <div>
        <form>
          <TextField
            id="standard-email"
            label="Email or Mobile Number"
            // className={classes.textField}
            value={this.state.email}
            // onChange={this.handleLastName}
            margin="normal"
            helperText="forgot password?" //this will eventually be a link to something
          />
          <TextField
            id="standard-password"
            label="Password"
            type="password"
            // className={classes.textField}
            value={this.state.password}
            // onChange={this.handleLastName}
            margin="normal"
          />
          <Button color="primary" type="submit">
            Log In
          </Button>
        </form>
      </div>
    );
  }
}
type StyledProps = StateProps & DispatchProps & StyledComponentProps<string>;
export const Home: React.ComponentType<StyledProps> = withTheme()(withStyles(styles)(InternalHome));
export default routeNode('home')(Home);
