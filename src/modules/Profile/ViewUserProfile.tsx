import * as React from 'react';
import { StyledComponentProps, Theme, withStyles, WithStyles, withTheme, WithTheme } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';

const defaultImg = require('./profile_default.png');

interface StateProps {}

interface DispatchProps {}

interface InternalState {}

const styles = (theme: Theme): { [key: string]: CSSProperties } => ({
  root: {},
  basicInfoDiv: {
    width: '100%',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row'
  },
  profileImg: {
    width: '50%',
    margin: '5% 40%',
    borderRadius: '100%'
  },
  imgDiv: {
    width: '30%'
  },
  orangeText: {
    color: '#F17820'
  },
  infoDiv: {
    display: 'flex',
    flexDirection: 'column'
  }
});

type PropsWithStyles = StateProps &
  DispatchProps &
  WithTheme &
  WithStyles<'root' | 'basicInfoDiv' | 'profileImg' | 'imgDiv' | 'orangeText' | 'infoDiv'>;

class ViewProfile extends React.PureComponent<PropsWithStyles, InternalState> {
  state = {};

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.basicInfoDiv}>
          <div className={classes.imgDiv}>
            <img src={defaultImg} alt="default" className={classes.profileImg} />
          </div>
          <div className={classes.infoDiv}>
            <h1 className={classes.orangeText}>Name here</h1>

            <h3>
              {/* <Place /> */}
              Location here
            </h3>

            <h3>Social media links here</h3>
          </div>
        </div>
      </div>
    );
  }
}
type StyledProps = StateProps & DispatchProps & StyledComponentProps<string>;
export const Profile: React.ComponentType<StyledProps> = withTheme()(withStyles(styles)(ViewProfile));
export default Profile;
