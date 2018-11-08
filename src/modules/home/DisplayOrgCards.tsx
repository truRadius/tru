import * as React from 'react';

import { Theme, WithStyles, withTheme, WithTheme, StyledComponentProps, withStyles } from '@material-ui/core';

import { CSSProperties } from '@material-ui/core/styles/withStyles';

interface StateProps {}

interface DispatchProps {}

interface InternalState {}

const styles = (theme: Theme): { [key: string]: CSSProperties } => ({
  root: {}
});

type PropsWithStyles = StateProps & DispatchProps & WithTheme & WithStyles<'root'>;

class InternalOrgCards extends React.PureComponent<PropsWithStyles, InternalState> {
  state: {};

  render() {
    return <div>Organization Cards here!!</div>;
  }
}

type StyledProps = StateProps & DispatchProps & StyledComponentProps<string>;
export const DisplayOrgCards: React.ComponentType<StyledProps> = withTheme()(withStyles(styles)(InternalOrgCards));
export default DisplayOrgCards;
