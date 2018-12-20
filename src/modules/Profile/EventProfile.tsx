/* tslint:disable */

import * as React from 'react';
import {
  StyledComponentProps,
  Theme,
  withStyles,
  WithStyles,
  withTheme,
  WithTheme
  // Typography,
  // Grid,
  // List
} from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
// import LocationOn from '@material-ui/icons/LocationOn';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import * as Brands from '@fortawesome/free-brands-svg-icons';
const axios = require('axios');

interface StateProps {}

interface DispatchProps {}

interface InternalState {}

const styles = (theme: Theme): { [key: string]: CSSProperties } => ({
  root: {}
});

type PropsWithStyles = StateProps &
  DispatchProps &
  WithTheme &
  WithStyles<'root' | 'basicInfoDiv' | 'profileImg' | 'imgDiv' | 'container' | 'socialIcons'>;

class ViewEventProfile extends React.PureComponent<PropsWithStyles, InternalState> {
  state = {};

  componentDidMount = () => {
    let id = 33;
    console.log(this.context);
    axios
      .get(`http://localhost:8000/api/event/${id}`, { params: { currentUser: sessionStorage.getItem('UserObj') } })
      .then((res: any) => {
        console.log('Data', res.data);
      });
  };
  render() {
    // const { classes } = this.props;
    return (
      <>
        <div> Event profile page here!</div>
      </>
    );
  }
}
type StyledProps = StateProps & DispatchProps & StyledComponentProps<string>;
export const EventProfile: React.ComponentType<StyledProps> = withTheme()(withStyles(styles)(ViewEventProfile));
export default EventProfile;
