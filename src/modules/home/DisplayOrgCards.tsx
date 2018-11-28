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
  Button,
  IconButton,
  CardActions,
  Collapse
} from '@material-ui/core';
import classnames from 'classnames';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Brands from '@fortawesome/free-brands-svg-icons';
// import { faFacebookF, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';
library.add(faGlobe);
const logo = require('./dummy-logo.jpg');

interface StateProps {}

interface DispatchProps {}

interface InternalState {
  expanded: boolean;
}

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
    height: '10vh',
    backgroundImage: `url(${logo})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    [theme.breakpoints.down('xs')]: {
      height: '15vh',
    },
  },
  socialIcons: {
    color: '#2E4C63',
    padding: 20,
    cursor: 'pointer',
    willChange: 'transform',
    transition: '.5s',
    transitionTimingFunction: 'cubic-bezier(.24,-0.01,0,1.69)',
    '&:hover': {
      transform: 'scale(1.5)',
    },
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8,
    },
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
});

type PropsWithStyles = StateProps & DispatchProps & WithTheme & WithStyles<
  'root' | 
  'card' | 
  'button' | 
  'logo' |
  'socialIcons' |
  'expand' |
  'expandOpen'
>;

const causes = [
  'Animal Welfare',
  'Arts and Culture',
  'Children',
  'Social Services'
];

class InternalOrgCards extends React.PureComponent<PropsWithStyles, InternalState> {
  state: InternalState = {
    expanded: false,
  };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  }

  followOrganization = () => {
    // TODO: add to follow table
  }
  createCard = () => {
    const { classes } = this.props;
    const { expanded } = this.state;
    return (
      <Card className={this.props.classes.card} style={{ margin: '10px auto' }}>
        <CardContent>
          <Grid container spacing={16}>
            <Grid item xs={12} sm={4} className={classes.logo} />
            <Grid item xs>
              <Typography variant="h6" color="secondary">Placeholder Organization</Typography>
              <Grid item xs={12} container direction="row">
                {causes.map(c => (                      
                  <Typography variant="subtitle1" style={{ padding: '10px 20px 0 0' }}>{c}</Typography>
                ))}
              </Grid>
              <Grid item xs={12} container direction="row">
                <FontAwesomeIcon className={classes.socialIcons} style={{ paddingLeft: 0 }} icon={Brands.faFacebookF} />
                <FontAwesomeIcon className={classes.socialIcons} icon="globe" />
                <FontAwesomeIcon className={classes.socialIcons} icon={Brands.faTwitter} />
                <FontAwesomeIcon className={classes.socialIcons} icon={Brands.faLinkedin} />
              </Grid>
              <Grid item xs={12} container direction="row">
                <Typography variant="subtitle2" style={{ padding: '10px 20px 0 0' }}>200 Followers</Typography>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions  disableActionSpacing>
          <Button color="primary" className={classes.button} onClick={this.followOrganization}>
            Follow
          </Button>
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded,
            })}
            onClick={this.handleExpandClick}
            aria-expanded={expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography gutterBottom component="h7">
              It is a long established fact that a reader will be distracted by the readable content of a page when
              looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using 'Content here, content here', making it look like
              readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their
              default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.
              Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected
              humour and the like).
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    );
  }

  render() {
    return (
      <div>
        <Grid container alignContent="center" justify="center" direction="column">
          <Grid item sm={12}>{this.createCard()}</Grid>
          <Grid item sm={12}>{this.createCard()}</Grid>
          <Grid item sm={12}>{this.createCard()}</Grid>
          <Grid item sm={12}>{this.createCard()}</Grid>
          <Grid item sm={12}>{this.createCard()}</Grid>
          <Grid item sm={12}>{this.createCard()}</Grid>
        </Grid>
      </div>
    );
  }
}

type StyledProps = StateProps & DispatchProps & StyledComponentProps<string>;
export const DisplayOrgCards: React.ComponentType<StyledProps> = withTheme()(withStyles(styles)(InternalOrgCards));
export default DisplayOrgCards;
