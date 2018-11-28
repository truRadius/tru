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
  Button,
  GridList,
  GridListTile,
  Card,
  CardActionArea,
  CardContent
} from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Brands from '@fortawesome/free-brands-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';

const logo = require('../home/dummy-logo.jpg');
library.add(faGlobe);

const organization = {
  name: 'Feeding America',
  postalCode: 37128,
  city: 'Murfreesboro',
  state: 'TN',
  causes: [
    'Poverty Alleviation',
    'Human Rights',
  ],
  about: 'Sed interdum, neque ut mattis rhoncus, quam purus lobortis sem, id efficitur risus nisi at metus. Praesent placerat lacinia facilisis. Suspendisse vel tempus massa. In ut pellentesque tellus. In euismod lacus ut dapibus consectetur. Suspendisse bibendum, turpis a eleifend condimentum, dui libero sollicitudin tellus, vel hendrerit lacus nunc sit amet purus. Integer finibus, diam ut ultrices laoreet, lectus eros elementum ex, sit amet pharetra quam magna non lorem.',
  linkedIn: '#',
  twitter: '#',
  facebook: '#',
  website: '#',
  followers: 200
};

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
    width: '100%',
    borderRadius: '100%'
  },
  imgDiv: {
    width: '20%'
  },
  container: {
    width: '80%',
    margin: '0 auto',
    maxWidth: 1000,
    padding: '20px 0',
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
      transform: 'scale(1.5)',
    },
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  card: {
    maxWidth: '90%',
    margin: '0 auto'
  },
  typography: {
    paddingBottom: 10,
    paddingTop: 20,
  }
});

type PropsWithStyles = StateProps &
  DispatchProps &
  WithTheme &
  WithStyles<
  'root' | 
  'basicInfoDiv' | 
  'profileImg' | 
  'imgDiv' | 
  'container' | 
  'socialIcons' | 
  'gridList' | 
  'card' |
  'typography'
  >;

class InternalOrganizationProfile extends React.PureComponent<PropsWithStyles, InternalState> {
  state = {};

  render() {
    const { classes } = this.props;
    return (
      <>
      <div style={{ width: '100%', background: 'white' }}>
        <Grid container className={classes.container}>
          <Grid item sm>
            <img src={logo} alt="default" className={classes.profileImg} />
          </Grid>
          <Grid item sm container direction="column" justify="center" style={{ paddingLeft: 30 }}>
            <Typography variant="h3" color="primary">{organization.name}</Typography>
            <Grid item>
              {
                organization.website &&
                <a href={organization.website}>
                <FontAwesomeIcon className={classes.socialIcons} style={{ paddingLeft: 0 }} icon="globe" />
                </a>
              }
              {
                organization.facebook &&
                <a href={organization.facebook}>
                <FontAwesomeIcon className={classes.socialIcons} icon={Brands.faFacebookF} />
                </a>
              }
              {
                organization.twitter &&
                <a href={organization.twitter}>
                <FontAwesomeIcon className={classes.socialIcons} icon={Brands.faTwitter} />
                </a>
              }
              {
                organization.linkedIn &&
                <a href={organization.linkedIn}>
                <FontAwesomeIcon className={classes.socialIcons} icon={Brands.faLinkedin} />
                </a>
              }
            </Grid>
            <Typography variant="subtitle1" color="primary">{organization.followers} Followers</Typography>
            <Grid item>
              <Button color="primary">FOLLOW</Button>
            </Grid>
          </Grid>
        </Grid>
      </div>
      <Grid container className={classes.container} style={{ padding: '20px 0' }} spacing={16}>
        <Grid item sm={10}>
          <Typography variant="h5" color="secondary" className={classes.typography}>About</Typography>
          <Typography variant="body1" color="secondary">{organization.about}</Typography>
        </Grid>
        <Grid item sm={2}>
          <Typography variant="h5" color="secondary" className={classes.typography}>Causes</Typography>
          <List className={classes.root} subheader={<li />}>
            {organization.causes.map(c => (
              <li key={c}>
                <Typography color="secondary">{c}</Typography>
              </li>
            ))}
          </List>
        </Grid>
        <Typography variant="h5" color="secondary" className={classes.typography}>Events</Typography>
        <GridList className={classes.gridList} cols={2.5}>
          <GridListTile>
            <Card className={classes.card} style={{ margin: '5% auto' }}>
              <CardActionArea>
                <CardContent>
                  <Grid container alignContent="center" justify="space-evenly" direction="row" spacing={24}>
                    <Grid sm={2} style={{ margin: '16px' }}>
                      <Grid container alignContent="center" justify="flex-start" direction="column">
                        <Grid sm style={{ color: '#F17820', fontSize: '3.4em' }}>
                          29
                        </Grid>
                        <Grid sm style={{ fontSize: '2em' }}>
                          Sep
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid sm style={{ margin: '16px' }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        Feed the Homeless
                      </Typography>
                      <Typography component="p">8-am SanJose, CA </Typography>
                      <Typography component="p">12 people are planning to attend</Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </CardActionArea>
            </Card>
          </GridListTile>
          <GridListTile>
            <Card className={classes.card} style={{ margin: '5% auto' }}>
              <CardActionArea>
                <CardContent>
                  <Grid container alignContent="center" justify="space-evenly" direction="row" spacing={24}>
                    <Grid sm={2} style={{ margin: '16px' }}>
                      <Grid container alignContent="center" justify="flex-start" direction="column">
                        <Grid sm style={{ color: '#F17820', fontSize: '3.4em' }}>
                          29
                        </Grid>
                        <Grid sm style={{ fontSize: '2em' }}>
                          Sep
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid sm style={{ margin: '16px' }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        Feed the Homeless
                      </Typography>
                      <Typography component="p">8-am SanJose, CA </Typography>
                      <Typography component="p">12 people are planning to attend</Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </CardActionArea>
            </Card>
          </GridListTile>
          <GridListTile>
            <Card className={classes.card} style={{ margin: '5% auto' }}>
              <CardActionArea>
                <CardContent>
                  <Grid container alignContent="center" justify="space-evenly" direction="row" spacing={24}>
                    <Grid sm={2} style={{ margin: '16px' }}>
                      <Grid container alignContent="center" justify="flex-start" direction="column">
                        <Grid sm style={{ color: '#F17820', fontSize: '3.4em' }}>
                          29
                        </Grid>
                        <Grid sm style={{ fontSize: '2em' }}>
                          Sep
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid sm style={{ margin: '16px' }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        Feed the Homeless
                      </Typography>
                      <Typography component="p">8-am SanJose, CA </Typography>
                      <Typography component="p">12 people are planning to attend</Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </CardActionArea>
            </Card>
          </GridListTile>
          <GridListTile>
            <Card className={classes.card} style={{ margin: '5% auto' }}>
              <CardActionArea>
                <CardContent>
                  <Grid container alignContent="center" justify="space-evenly" direction="row" spacing={24}>
                    <Grid sm={2} style={{ margin: '16px' }}>
                      <Grid container alignContent="center" justify="flex-start" direction="column">
                        <Grid sm style={{ color: '#F17820', fontSize: '3.4em' }}>
                          29
                        </Grid>
                        <Grid sm style={{ fontSize: '2em' }}>
                          Sep
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid sm style={{ margin: '16px' }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        Feed the Homeless
                      </Typography>
                      <Typography component="p">8-am SanJose, CA </Typography>
                      <Typography component="p">12 people are planning to attend</Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </CardActionArea>
            </Card>
          </GridListTile>
        </GridList>
      </Grid>
      </>
    );
  }
}
type StyledProps = StateProps & DispatchProps & StyledComponentProps<string>;
export const OrganizationProfile: React.ComponentType<StyledProps> =
  withTheme()(withStyles(styles)(InternalOrganizationProfile));
