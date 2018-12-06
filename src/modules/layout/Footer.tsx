/* tslint:disable */
import * as React from 'react';
import { Link } from 'react-router-dom';
import {
  StyledComponentProps,
  Theme,
  withStyles,
  WithStyles,
  withTheme,
  WithTheme,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText
} from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';

interface StateProps {}

interface DispatchProps {}

interface InternalState {}

const styles = (theme: Theme): { [key: string]: CSSProperties } => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  typography: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: '1.3em'
  },
  listText: {
    color: 'white'
  }
});

type PropsWithStyles = StateProps & DispatchProps & WithTheme & WithStyles<'root' | 'typography' | 'listText'>;
interface StateProps {
  isLoggedIn: any;
}
// tslint:disable-next-line:no-any
class InternalFooter extends React.Component<PropsWithStyles, InternalState> {
  state = {};

  logOut = () => {
    sessionStorage.removeItem('UserObj');
    this.props.isLoggedIn();
  };

  render() {
    const { classes } = this.props;

    return (
      <div style={{ width: '100%', backgroundColor: '#2E4C63' }}>
        <Grid container style={{ width: '80%', margin: '0 auto', paddingTop: 40, maxWidth: 1000 }}>
          <Grid item sm={4}>
            <Typography className={classes.typography}>Your Account</Typography>
            <List component="nav">
              <ListItem button>
                <ListItemText disableTypography className={classes.listText} primary="View" />
              </ListItem>
              <ListItem button>
                <Link to="/">
                  <ListItemText
                    disableTypography
                    onClick={this.logOut}
                    className={classes.listText}
                    primary="Log Out"
                  />
                </Link>
              </ListItem>
            </List>
          </Grid>
          <Grid item sm={4}>
            <Typography className={classes.typography}>Discover</Typography>
            <List component="nav">
              <ListItem button>
                <ListItemText disableTypography className={classes.listText} primary="Events" />
              </ListItem>
              <ListItem button>
                <ListItemText disableTypography className={classes.listText} primary="Organizations" />
              </ListItem>
            </List>
          </Grid>
          <Grid item sm={4}>
            <Typography className={classes.typography}>truRadius</Typography>
            <List component="nav">
              <ListItem button>
                <ListItemText disableTypography className={classes.listText} primary="About" />
              </ListItem>
              <ListItem button>
                <ListItemText disableTypography className={classes.listText} primary="Pro Membership" />
              </ListItem>
            </List>
          </Grid>
        </Grid>
        <div style={{ backgroundColor: 'white', width: '100%' }}>
          <div style={{ width: '80%', margin: '0 auto', padding: '20px 0', maxWidth: 1000 }}>
            <Typography color="secondary" style={{ fontWeight: 'bold' }}>
              truRadius, Copyright 2018
            </Typography>
          </div>
        </div>
      </div>
    );
  }
}

type StyledProps = StateProps & DispatchProps & StyledComponentProps<string>;
export const Footer: React.ComponentType<StyledProps> = withTheme()(withStyles(styles)(InternalFooter));
