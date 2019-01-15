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
  CardContent,
  Card,
  Typography,
  Button
} from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Brands from '@fortawesome/free-brands-svg-icons';
import { LocationOn } from '@material-ui/icons';
import { Link } from 'react-router-dom';
library.add(faGlobe);
const logo = require('./dummy-logo.jpg');

interface StateProps {
  orgs: Array<{
    organization_id: string;
    organization_name: string;
    mission: string;
    address_line_1: string;
    city: string;
    state: string;
    zip: string;
    website_url: string;
  }>;
  err: string;
}

interface DispatchProps {}

interface InternalState {}

const styles = (theme: Theme): { [key: string]: CSSProperties } => ({
  root: {},
  card: {
    maxWidth: '90%',
    margin: '0 auto'
  },
  button: {
    // margin: theme.spacing.unit
  },
  logo: {
    width: '100%',
    height: '10vh',
    backgroundImage: `url(${logo})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    [theme.breakpoints.down('xs')]: {
      height: '15vh'
    }
  },
  socialIcons: {
    color: '#2E4C63',
    padding: 20,
    cursor: 'pointer',
    willChange: 'transform',
    transition: '.5s',
    transitionTimingFunction: 'cubic-bezier(.24,-0.01,0,1.69)',
    '&:hover': {
      transform: 'scale(1.5)'
    }
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8
    }
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  }
});

type PropsWithStyles = StateProps &
  DispatchProps &
  WithTheme &
  WithStyles<'root' | 'card' | 'button' | 'logo' | 'socialIcons' | 'expand' | 'expandOpen'>;

class InternalOrgCards extends React.PureComponent<PropsWithStyles, InternalState> {
  state: InternalState = {};

  followOrganization = () => {
    // TODO: add to follow table
  };
  render() {
    const { classes, orgs, err } = this.props;
    // const {data} = this.props.orgs
    console.log(orgs, err);
    return (
      <div>
        {err !== '' ? (
          <h1>'No data found'</h1>
        ) : (
          <Grid container alignContent="center" justify="center" direction="row">
            {orgs.map(org => (
              <Grid key={org.organization_id} item sm={12}>
                <Link to={'/organization/' + org.organization_id} style={{ width: '100%' }}>
                  <Card className={classes.card} style={{ margin: '10px auto' }}>
                    <CardContent>
                      <Grid container spacing={16}>
                        <Grid item xs container>
                          <Typography variant="h5" color="secondary">
                            {org.organization_name}
                          </Typography>
                          <Grid item xs={12} container alignItems="center" direction="row">
                            <LocationOn color="secondary" />
                            <Typography variant="h6" color="secondary" style={{ padding: 10 }}>
                              {org.city}, {org.state}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} container alignItems="center" style={{ padding: '20px 0' }}>
                            {org.mission}
                          </Grid>
                          <Grid item xs direction="row">
                            <FontAwesomeIcon
                              className={classes.socialIcons}
                              style={{ paddingLeft: 0 }}
                              icon={Brands.faFacebookF}
                            />
                            {org.website_url !== '' ? (
                              <a href={org.website_url}>
                                <FontAwesomeIcon className={classes.socialIcons} icon="globe" />
                              </a>
                            ) : (
                              undefined
                            )}
                            <FontAwesomeIcon className={classes.socialIcons} icon={Brands.faTwitter} />
                            <FontAwesomeIcon className={classes.socialIcons} icon={Brands.faLinkedin} />
                          </Grid>
                          <Grid item xs direction="row" container justify="flex-end">
                            <Button color="primary" className={classes.button} onClick={this.followOrganization}>
                              Follow
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
        )}
      </div>
    );
  }
}

type StyledProps = StateProps & DispatchProps & StyledComponentProps<string>;
export const DisplayOrgCards: React.ComponentType<StyledProps> = withTheme()(withStyles(styles)(InternalOrgCards));
export default DisplayOrgCards;
