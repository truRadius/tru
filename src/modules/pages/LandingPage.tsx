import * as React from 'react';
import {
    StyledComponentProps,
    Theme,
    withStyles,
    WithStyles,
    withTheme,
    WithTheme,
    Typography,
    Grid
  } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';

const heroImage = require('./hero-image-6.jpg');

interface StateProps {
}

interface DispatchProps {
}

interface InternalState {
}

const styles = (theme: Theme): { [key: string]: CSSProperties } => ({
  root: {
    width: '100%', 
    height: '50vh', 
    backgroundImage: `url(${heroImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  },
  about: {
    color: 'white', 
    fontFamily: 'arial rounded MT', 
    textShadow: '1px 1px 11px rgba(0, 0, 0, 1)',
    textAlign: 'center',
    padding: '20px 0'
  },
  quote: {
    fontFamily: 'arial rounded MT', 
    textAlign: 'center',
    padding: '20px 0'
  }
});

type PropsWithStyles = StateProps & DispatchProps & WithTheme & WithStyles<
  'root' |
  'about' |
  'quote'
  >;

class InternalLandingPage extends React.PureComponent<PropsWithStyles, InternalState> {
  state = {
  };

  render() {
    const { classes } = this.props;

    return (
      <>
        <div className={classes.root}>
          <Grid container justify="center" alignItems="center" style={{ height: '100%' }}>
            <Grid item style={{ width: '80%', margin: '0 auto', maxWidth: 1000 }}>
              <Typography variant="h2" className={classes.about}>About <span style={{ color: '#F17820' }}>tru</span>Radius</Typography>
              <Typography variant="h5" className={classes.about} style={{ fontFamily: 'roboto' }}>
                <span style={{ color: '#F17820' }}>tru</span>Radius is a service that allows users to easily find 
                volunteer opportunities offered by businesses and non-profits that serve the community. This is a single 
                source for all volunteer opportunities in your area.
              </Typography>
            </Grid>
          </Grid>
        </div>
        <div style={{ backgroundColor: 'white', padding: '20px 0' }}>
          <Grid container justify="center" alignItems="center">
            <Grid item style={{ width: '80%', margin: '0 auto', maxWidth: 1000 }}>
              <Typography variant="h4" color="secondary" className={classes.quote}>Discover ways to take part in your al<span style={{ color: '#F17820' }}>tru</span>istic passions</Typography>
              <Typography variant="h5" color="secondary" className={classes.quote} style={{ fontFamily: 'roboto' }}>
                Every man must decide whether he will walk in the light of creative altruism or in the darkness of destructive selfishness.
              </Typography>
              <Typography variant="h5" color="secondary" className={classes.quote} style={{ fontFamily: 'roboto', textAlign: 'right' }}>
                ~ Dr. Martin Luther King, Jr.
              </Typography>
            </Grid>
          </Grid>
        </div>
      </>
    );
  }
}
type StyledProps = StateProps & DispatchProps & StyledComponentProps<string>;
export const LandingPage: React.ComponentType<StyledProps> =
  withTheme()(withStyles(styles)(InternalLandingPage));