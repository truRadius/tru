/* tslint:disable */
import * as React from 'react';
import {
  Theme,
  WithStyles,
  withTheme,
  WithTheme,
  StyledComponentProps,
  withStyles,
  Grid,
  CardActionArea,
  CardContent,
  Card,
  Typography,
  Button
} from '@material-ui/core';

import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';
library.add(faGlobe, faFacebookF, faTwitter, faLinkedin);
const logo = require('./dummy-logo.jpg');

interface StateProps {}

interface DispatchProps {}

interface InternalState {}

const styles = (theme: Theme): { [key: string]: CSSProperties } => ({
  root: {},
  card: {
    maxWidth: '90%',
    margin: '0 auto'
  },
  button: {
    margin: theme.spacing.unit
  },
  logo: {
    width: '100%',
    height: '20vh',
    backgroundImage: `url(${logo})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover'
  }
});

type PropsWithStyles = StateProps & DispatchProps & WithTheme & WithStyles<'root' | 'card' | 'button' | 'logo'>;

class InternalOrgCards extends React.PureComponent<PropsWithStyles, InternalState> {
  state: {};

  followOrganization = () => {
    //add to follow table
  };
  createCard = () => {
    const { classes } = this.props;
    return (
      <Card className={this.props.classes.card} style={{ margin: '5% auto' }}>
        <CardActionArea>
          <CardContent>
            <Grid container alignContent="center" justify="space-evenly" direction="column" spacing={24}>
              <Grid sm style={{ margin: '16px' }}>
                <Grid container alignContent="center" justify="flex-start" direction="row">
                  <Grid sm className={classes.logo} />
                  <Grid sm>
                    <Grid container alignContent="center" justify="space-evenly" direction="column">
                      <Grid sm style={{ fontSize: '2em' }}>
                        Name here
                      </Grid>
                      <Grid sm>
                        <Grid container alignContent="center" justify="flex-start" direction="row">
                          <Grid sm={1}>
                            <FontAwesomeIcon icon="facebook-f" />
                          </Grid>
                          <Grid sm={1}>
                            <FontAwesomeIcon icon="globe" />
                          </Grid>
                          <Grid sm={1}>
                            <FontAwesomeIcon icon="linkedin" />
                          </Grid>
                          <Grid sm={1}>
                            <FontAwesomeIcon icon="twitter" />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid sm>200 Followers</Grid>
                      <Grid sm justify="flex-start">
                        <Button variant="extendedFab" color="primary" type="button" onClick={this.followOrganization}>
                          Follow
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid sm style={{ margin: '16px' }}>
                <Typography gutterBottom component="h7">
                  It is a long established fact that a reader will be distracted by the readable content of a page when
                  looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal
                  distribution of letters, as opposed to using 'Content here, content here', making it look like
                  readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their
                  default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.
                  Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected
                  humour and the like).
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  };

  render() {
    return (
      <div>
        <Grid container alignContent="center" justify="space-evenly" direction="row">
          <Grid sm>{this.createCard()}</Grid>
          <Grid sm>{this.createCard()}</Grid>
        </Grid>
        <Grid container alignContent="center" justify="space-evenly" direction="row">
          <Grid sm>{this.createCard()}</Grid>
          <Grid sm>{this.createCard()}</Grid>
        </Grid>
        <Grid container alignContent="center" justify="space-evenly" direction="row">
          <Grid sm>{this.createCard()}</Grid>
          <Grid sm>{this.createCard()}</Grid>
        </Grid>
      </div>
    );
  }
}

type StyledProps = StateProps & DispatchProps & StyledComponentProps<string>;
export const DisplayOrgCards: React.ComponentType<StyledProps> = withTheme()(withStyles(styles)(InternalOrgCards));
export default DisplayOrgCards;
