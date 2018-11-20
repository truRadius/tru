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
  List
} from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import LocationOn from '@material-ui/icons/LocationOn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Brands from '@fortawesome/free-brands-svg-icons';

const defaultImg = require('./profile_default.png');

const user = {
  firstName: 'Jevon',
  lastName: 'Thomas',
  postalCode: 37128,
  city: 'Murfreesboro',
  state: 'TN',
  causes: [
    'Poverty Alleviation',
    'Human Rights',
  ],
  about: 'Sed interdum, neque ut mattis rhoncus, quam purus lobortis sem, id efficitur risus nisi at metus. Praesent placerat lacinia facilisis. Suspendisse vel tempus massa. In ut pellentesque tellus. In euismod lacus ut dapibus consectetur. Suspendisse bibendum, turpis a eleifend condimentum, dui libero sollicitudin tellus, vel hendrerit lacus nunc sit amet purus. Integer finibus, diam ut ultrices laoreet, lectus eros elementum ex, sit amet pharetra quam magna non lorem.',
  linkedIn: 'https://www.linkedin.com/in/jevonthomas/',
  twitter: undefined,
  facebook: 'https://www.facebook.com/moochDApush'
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
});

type PropsWithStyles = StateProps &
  DispatchProps &
  WithTheme &
  WithStyles<'root' | 'basicInfoDiv' | 'profileImg' | 'imgDiv' | 'container' | 'socialIcons'>;

class InternalOrganizationProfile extends React.PureComponent<PropsWithStyles, InternalState> {
  state = {};

  render() {
    const { classes } = this.props;
    return (
      <>
      <div style={{ width: '100%', background: 'white' }}>
        <Grid container className={classes.container}>
          <Grid item sm={2}>
            <img src={defaultImg} alt="default" className={classes.profileImg} />
          </Grid>
          <Grid item sm container direction="column" style={{ paddingLeft: 30 }}>
            <Typography variant="h3" color="primary">{user.firstName} {user.lastName}</Typography>
            <Grid item style={{ paddingTop: 10 }}>
              <Typography variant="h6" color="secondary"><LocationOn /> {user.city}, {user.state}</Typography>
            </Grid>
            <Grid item>
              {
                user.facebook &&
                <a href={user.facebook}>
                <FontAwesomeIcon className={classes.socialIcons} style={{ paddingLeft: 0 }} icon={Brands.faFacebookF} />
                </a>
              }
              {
                user.twitter &&
                <a href={user.twitter}>
                <FontAwesomeIcon className={classes.socialIcons} icon={Brands.faTwitter} />
                </a>
              }
              {
                user.linkedIn &&
                <a href={user.linkedIn}>
                <FontAwesomeIcon className={classes.socialIcons} icon={Brands.faLinkedin} />
                </a>
              }
            </Grid>
          </Grid>
        </Grid>
      </div>
      <Grid container className={classes.container} style={{ padding: '20px 0' }}>
        <Grid item sm={4}>
          <Typography variant="h5" color="secondary">Causes</Typography>
          <List className={classes.root} subheader={<li />}>
            {user.causes.map(c => (
              <li key={c}>
                <Typography color="secondary">{c}</Typography>
              </li>
            ))}
          </List>
        </Grid>
        <Grid item sm={8}>
          <Typography variant="h5" color="secondary">About</Typography>
          <Typography variant="body1" color="secondary">{user.about}</Typography>
        </Grid>
      </Grid>
      </>
    );
  }
}
type StyledProps = StateProps & DispatchProps & StyledComponentProps<string>;
export const OrganizationProfile: React.ComponentType<StyledProps> =
  withTheme()(withStyles(styles)(InternalOrganizationProfile));
