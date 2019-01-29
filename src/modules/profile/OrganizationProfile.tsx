/* tslint:disable */

import * as React from 'react';
import {
  StyledComponentProps,
  Theme,
  withStyles,
  WithStyles,
  withTheme,
  WithTheme,
  Typography,
  Grid,
  List,
  Tabs,
  Tab
} from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Brands from '@fortawesome/free-brands-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { LocationOn } from '@material-ui/icons';
import YouTube from 'react-youtube';
const axios = require('axios');
const defaultImg = require('./no-image.png');

// const logo = require('../home/dummy-logo.jpg');
library.add(faGlobe);

interface StateProps {}

interface DispatchProps {}

interface InternalState {
  value: number;
  organization: {
    summary: {
      organization_name: string;
      website_url: string;
      logo_url: string;
      impact_statement: string;
      media_urls: Array<string>;
      mission: string;
      ntee_codes: [
        {
          primary_description: string;
        }
      ];
      state: string;
      city: string;
      videos: [
        {
          video_url: string;
        }
      ];
    };
  };
}

const styles = (theme: Theme): { [key: string]: CSSProperties } => ({
  root: {},
  basicInfoDiv: {
    width: '100%',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row'
  },
  profileImg: {
    width: 'auto',
    maxHeight: 200,
    borderRadius: '100%'
  },
  imgDiv: {
    width: '20%'
  },
  container: {
    width: '80%',
    margin: '0 auto',
    maxWidth: 1000,
    padding: '20px 0'
  },
  socialIcons: {
    fontSize: '1.2em',
    color: '#2E4C63',
    padding: '10px 20px',
    cursor: 'pointer',
    willChange: 'transform',
    transition: '.5s',
    transitionTimingFunction: 'cubic-bezier(.24,-0.01,0,1.69)',
    '&:hover': {
      transform: 'scale(1.5)'
    }
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)'
  },
  card: {
    maxWidth: '90%',
    margin: '0 auto'
  },
  typography: {
    paddingBottom: 10,
    paddingTop: 20
  }
});

type PropsWithStyles = StateProps &
  DispatchProps &
  WithTheme &
  WithStyles<
    'root' | 'basicInfoDiv' | 'profileImg' | 'imgDiv' | 'container' | 'socialIcons' | 'gridList' | 'card' | 'typography'
  >;

class InternalOrganizationProfile extends React.PureComponent<PropsWithStyles, InternalState> {
  emptyArr: Array<string> = [];
  state: InternalState = {
    value: 1,
    organization: {
      summary: {
        organization_name: '',
        website_url: '',
        logo_url: '',
        impact_statement: '',
        media_urls: this.emptyArr,
        mission: '',
        ntee_codes: [{
          primary_description: ''
        }],
        state: '',
        city: '',
        videos: [{
            video_url: '',
        }]
      }
    }
  };

  getOrganizationData = () => {
    let url = window.location.href.split('/');
    let params = +url[url.length - 1];
    return new Promise((resolve, reject) => {
      axios.get(`http://localhost:8000/api/externalApi/${params}`).then((res: any) => {
        this.setState(
          prevState => ({
            ...prevState,
            organization: {
              ...prevState.organization,
              summary: {
                ...prevState.organization.summary,
                organization_name: res.data.summary.organization_name,
                website_url: res.data.summary.website_url,
                logo_url: res.data.summary.logo_url,
                impact_statement: res.data.summary.impact_statement,
                media_urls: res.data.summary.social_media_urls,
                mission: res.data.summary.mission,
                ntee_codes: res.data.summary.ntee_codes,
                city: res.data.summary.city,
                state: res.data.summary.state,
                videos: res.data.summary.videos,
              }
            }
          }),
          () => {
            resolve(res.data);
          }
        );
      });
    });
  };

  componentDidMount = () => {
    this.getOrganizationData().then(data => {
      console.log('Response for Org:', data);
    });
  };

  handleChange = (event: any, value: number) => {
    this.setState({ value: value });
  };
  
  render() {
    const { classes } = this.props;
    const { organization, value } = this.state;
    const opts = {
      height: '390px',
      width: '100%',
    };

    return (
      <>
        {this.state.organization.hasOwnProperty('summary') ? (
          <div style={{minHeight: '77vh'}}>
            <div style={{ width: '100%', background: 'white' }}>
              <Grid container className={classes.container}>
                <Grid item container justify="center" xs>
                  <img 
                    src={organization.summary.logo_url !== '' ? organization.summary.logo_url : defaultImg} 
                    alt="Organization Logo" 
                    className={classes.profileImg} 
                  />
                </Grid>
                <Grid item xs container direction="column" justify="center" style={{ paddingLeft: 30 }}>
                  <Typography variant="h4" color="primary">
                    {organization.summary.organization_name}
                  </Typography>
                  <Grid item xs>
                    <Grid item xs={12} container alignItems="center" direction="row">
                      <LocationOn color="secondary" />
                      <Typography variant="h6" color="secondary" style={{ padding: 10 }}>
                        {organization.summary.city}, {organization.summary.state}
                      </Typography>
                    </Grid>
                    {organization.summary.website_url && (
                      <a href={organization.summary.website_url}>
                        <FontAwesomeIcon className={classes.socialIcons} style={{ paddingLeft: 2 }} icon="globe" />
                      </a>
                    )}

                    {organization.summary.media_urls[0] && (
                      <a href={organization.summary.media_urls[0]}>
                        <FontAwesomeIcon className={classes.socialIcons} icon={Brands.faFacebookF} />
                      </a>
                    )}
                    {organization.summary.media_urls[1] && (
                      <a href={organization.summary.media_urls[1]}>
                        <FontAwesomeIcon className={classes.socialIcons} icon={Brands.faTwitter} />
                      </a>
                    )}
                    {/* {organization.linkedIn && (
                      <a href={organization.linkedIn}>
                        <FontAwesomeIcon className={classes.socialIcons} icon={Brands.faLinkedin} />
                      </a>
                    )} */}
                  </Grid>
                </Grid>
              </Grid>
              <div className={classes.root}>
                <Tabs centered value={value} onChange={this.handleChange}>
                  <Tab value={1} label="About" />
                  <Tab value={2} label="Media" />
                </Tabs>
              </div>
            </div>
            {value === 1 &&
              <Grid container className={classes.container} style={{ padding: '20px 0' }} spacing={16}>
                <Grid item xs={12}>
                  <Typography variant="h5" color="secondary" className={classes.typography}>
                    Causes
                  </Typography>
                  <List className={classes.root} subheader={<li />}>
                    {organization.summary.ntee_codes.map(d => (
                      <li>
                        <Typography color="secondary">{d.primary_description}</Typography>
                      </li>
                    ))}
                  </List>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h5" color="secondary" className={classes.typography}>
                    About
                  </Typography>
                  <Typography variant="body1" color="secondary">
                    {organization.summary.impact_statement != null
                      ? organization.summary.impact_statement
                      : organization.summary.mission}
                  </Typography>
                </Grid>
              </Grid>
            }
            {value === 2 && 
            <Grid container direction="row" className={classes.container} spacing={24}>
              {organization.summary.videos.length > 0 && organization.summary.videos[0].video_url !== '' ?
                organization.summary.videos.map(v => (
                  <Grid item xs={12} md={6}>
                    <YouTube 
                      videoId={v.video_url.substr(32)}
                      opts={opts}
                    >
                    </YouTube>
                  </Grid>
                )) :
                <Grid item>
                  No Videos Posted
                </Grid>
              }
            </Grid>
            }
          </div>
        ) : (
          <h1>lOADING.....</h1>
        )}
      </>
    );
  }
}
type StyledProps = StateProps & DispatchProps & StyledComponentProps<string>;
export const OrganizationProfile: React.ComponentType<StyledProps> = withTheme()(
  withStyles(styles)(InternalOrganizationProfile)
);
