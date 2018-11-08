import * as React from 'react';
// import { routeNode } from 'react-router5';
import { StyledComponentProps, Theme, withStyles, WithStyles, withTheme, WithTheme } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';

interface StateProps {}

interface DispatchProps {}

interface InternalState {}

const styles = (theme: Theme): { [key: string]: CSSProperties } => ({
  root: {}
});

type PropsWithStyles = StateProps & DispatchProps & WithTheme & WithStyles<'root'>;

class InternalHome extends React.PureComponent<PropsWithStyles, InternalState> {
  state = {};

  render() {
    return <div>Home</div>;
  }
}
type StyledProps = StateProps & DispatchProps & StyledComponentProps<string>;
export const Home: React.ComponentType<StyledProps> = withTheme()(withStyles(styles)(InternalHome));
export default Home;
