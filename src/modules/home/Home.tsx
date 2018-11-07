/* tslint:disable */
import * as React from 'react';
import { StyledComponentProps, Theme, withStyles, WithStyles, withTheme, WithTheme } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { Grid } from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
interface StateProps {}

interface DispatchProps {}

interface InternalState {}

const styles = (theme: Theme): { [key: string]: CSSProperties } => ({
  root: {},
  toggleContainer: {
    height: 56,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    display: 'flex',
    justifyContent: 'flex-end',
    margin: `${theme.spacing.unit}px 0`,
    background: '#f17820',
    maxWidth: '100%',
    flexBasis: '100%'
  },
  customButton: {
    // border: '1px solid white',
    borderRadius: 0,
    margin: 'auto 0'
  },
  mainDiv: {
    backgroundColor: '#f17820'
  },
  toggleBtn: {
    padding: 0,
    backgroundColor: '#f17820',
    color: 'white'
  },
  toggleGroup: {
    backgroundColor: '#f17820',
    boxShadow: 'none',
    border: '1px solid white',
    borderRadius: 0,
    margin: 'auto 0',
    fontWeight: 200
  },
  activeBtn: {
    backgroundColor: 'white',
    padding: 0,
    color: '#f17820'
  }
});

type PropsWithStyles = StateProps &
  DispatchProps &
  WithTheme &
  WithStyles<'root' | 'mainDiv' | 'toggleContainer' | 'customButton' | 'toggleBtn' | 'toggleGroup' | 'activeBtn'>;

class InternalHome extends React.PureComponent<PropsWithStyles, InternalState> {
  state = {
    selected: 'event'
  };

  handleToggle = (e: any) => {
    console.log(e.target.id, 'clicked');
    this.setState({ selected: e.target.id });
  };
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.mainDiv}>
        <Grid container spacing={16}>
          <div className={classes.toggleContainer}>
            <ToggleButtonGroup className={classes.toggleGroup} exclusive onClick={this.handleToggle}>
              <ToggleButton
                id="event"
                value="event"
                style={
                  { padding: '0 30px' } // onClick={this.handleToggle}
                }
                className={this.state.selected === 'event' ? classes.activeBtn : classes.toggleBtn}
              >
                <span id="event" className={classes.customButton}>
                  Event
                </span>
              </ToggleButton>
              <ToggleButton
                value="organization"
                id="organization"
                style={
                  { padding: '0 30px' } // onClick={this.handleToggle}
                }
                className={this.state.selected === 'organization' ? classes.activeBtn : classes.toggleBtn}
              >
                <span id="organization" className={classes.customButton}>
                  Organization
                </span>
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
        </Grid>
      </div>
    );
  }
}
type StyledProps = StateProps & DispatchProps & StyledComponentProps<string>;
export const Home: React.ComponentType<StyledProps> = withTheme()(withStyles(styles)(InternalHome));
export default Home;
