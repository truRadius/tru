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
  FormControl,
  TextField,
  InputBase,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Input,
  Checkbox,
  ListItemText,
  MuiThemeProvider,
  createMuiTheme
} from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
let zipcodes = require('zipcodes');

const heroImage = require('./hero-image-6.jpg');

interface StateProps {}

interface DispatchProps {}

interface InternalState {}

const distance = [10, 25, 50, 100];
const causes = [
  'Animal Welfare',
  'Arts and Culture',
  'Children',
  'Civil Rights and Social Action',
  'Disaster and Humanitarian Relief',
  'Economic Empowerment',
  'Education',
  'Environment',
  'Health',
  'Human Rights',
  'Politics',
  'Poverty Alleviation',
  'Science and Technology',
  'Social Services'
];
const category = ['Events', 'Organizations'];
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const styles = (theme: Theme): { [key: string]: CSSProperties } => ({
  root: {
    width: '100%',
    height: '50vh',
    backgroundImage: `url(${heroImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover'
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
  },
  inputInput: {
    paddingTop: 4,
    paddingRight: theme.spacing.unit,
    paddingBottom: 4,
    paddingLeft: 20,
    transition: theme.transitions.create('width'),
    width: '100%',
    border: '1px solid #2E4C63',
    borderRadius: 40,
    backgroundColor: 'white'
  },
  formControl: {
    minWidth: 120,
    width: '100%'
  },
  gridItem: {
    padding: 8
  }
});

const themeAlt = createMuiTheme({
  palette: {
    primary: {
      main: '#2E4C63'
    }
  }
});

type PropsWithStyles = StateProps &
  DispatchProps &
  WithTheme &
  WithStyles<'root' | 'about' | 'quote' | 'inputInput' | 'formControl' | 'gridItem'>;

class InternalLandingPage extends React.PureComponent<PropsWithStyles, InternalState> {
  cause: Array<string> = [];
  state = {
    search: undefined,
    zipCode: undefined,
    distance: 10,
    cause: this.cause,
    category: 'Events',
    zipcodeErr: ''
  };
  unique = 1;
  // tslint:disable-next-line:no-any
  handleChange = (name: string) => (event: any) => {
    this.setState({ [name]: event.target.value });
  };

  handleZipcodeChange = (event: any) => {
    const onlyNums = event.target.value.replace(/[^0-9]/, '');
    if (onlyNums.length < 5) {
      this.setState({ zipCode: onlyNums });
    } else if (onlyNums.length === 5) {
      this.setState({ zipCode: onlyNums });
    }
  };

  validateZipcode = (e: any) => {
    if (zipcodes.lookup(this.state.zipCode) === undefined) {
      this.setState({ zipcodeErr: 'Not a valid zipcode' });
      e.target.focus();
    } else {
      this.setState({ zipcodeErr: '' });
    }
  };
  render() {
    const { classes } = this.props;

    return (
      <>
        <div className={classes.root}>
          <Grid container justify="center" alignItems="center" style={{ height: '100%' }}>
            <Grid item style={{ width: '80%', margin: '0 auto', maxWidth: 1000 }}>
              <Typography variant="h2" className={classes.about}>
                About <span style={{ color: '#F17820' }}>tru</span>
                Radius
              </Typography>
              <Typography variant="h5" className={classes.about} style={{ fontFamily: 'roboto' }}>
                <span style={{ color: '#F17820' }}>tru</span>
                Radius is a service that allows users to easily find volunteer opportunities offered by businesses and
                non-profits that serve the community. This is a single source for all volunteer opportunities in your
                area.
              </Typography>
            </Grid>
          </Grid>
        </div>
        <div style={{ backgroundColor: 'white', padding: '20px 0' }}>
          <Grid container justify="center" alignItems="center">
            <Grid item style={{ width: '80%', margin: '0 auto', maxWidth: 1000 }}>
              <Typography variant="h4" color="secondary" className={classes.quote}>
                Discover ways to take part in your al
                <span style={{ color: '#F17820' }}>tru</span>
                istic passions
              </Typography>
              <Typography variant="h5" color="secondary" className={classes.quote} style={{ fontFamily: 'roboto' }}>
                Every man must decide whether he will walk in the light of creative altruism or in the darkness of
                destructive selfishness.
              </Typography>
              <Typography
                variant="h5"
                color="secondary"
                className={classes.quote}
                style={{ fontFamily: 'roboto', textAlign: 'right' }}
              >
                ~ Dr. Martin Luther King, Jr.
              </Typography>
            </Grid>
          </Grid>
        </div>
        <form style={{ width: '80%', margin: '20px auto 40px', maxWidth: 10000 }}>
          <Grid container justify="center" alignItems="center">
            <Grid item style={{ width: '80%', margin: '0 auto', maxWidth: 1000 }}>
              <Typography variant="h4" color="secondary" className={classes.quote}>
                Try it!
              </Typography>
              <Typography variant="h5" color="secondary" className={classes.quote} style={{ fontFamily: 'roboto' }}>
                Use the form below to find organizations or events that support your cause.
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item md={12} container alignItems="center">
              <Grid item md={5} className={classes.gridItem}>
                <MuiThemeProvider theme={themeAlt}>
                  <FormControl className={classes.formControl}>
                    <InputBase
                      fullWidth
                      placeholder="Search"
                      classes={{
                        input: classes.inputInput
                      }}
                    />
                  </FormControl>
                </MuiThemeProvider>
              </Grid>
              <Grid item md={5} className={classes.gridItem}>
                <MuiThemeProvider theme={themeAlt}>
                  <FormControl className={classes.formControl}>
                    <TextField
                      id="zipcode"
                      fullWidth
                      label="Zip Code"
                      value={this.state.zipCode}
                      onBlur={this.validateZipcode}
                      onChange={this.handleZipcodeChange}
                      helperText={this.state.zipcodeErr}
                    />
                  </FormControl>
                </MuiThemeProvider>
              </Grid>
              <Grid item md={2} className={classes.gridItem}>
                <MuiThemeProvider theme={themeAlt}>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="distance">Distance</InputLabel>
                    <Select
                      fullWidth
                      value={this.state.distance}
                      onChange={this.handleChange('distance')}
                      inputProps={{
                        name: 'distance',
                        id: 'distance'
                      }}
                    >
                      {distance.map(d => (
                        <MenuItem key={d} value={d}>
                          {d} Miles
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </MuiThemeProvider>
              </Grid>
            </Grid>
            <Grid item md={12} container alignItems="center">
              <Grid item md={5} className={classes.gridItem}>
                <MuiThemeProvider theme={themeAlt}>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="causes">Causes</InputLabel>
                    <Select
                      multiple
                      value={this.state.cause}
                      onChange={this.handleChange('cause')}
                      input={<Input multiline id="select-multiple-checkbox" />}
                      renderValue={() => this.state.cause.join(', ')}
                      MenuProps={MenuProps}
                    >
                      {causes.map(c => (
                        <MenuItem key={this.unique++} value={c}>
                          <Checkbox checked={this.state.cause.indexOf(c) > -1} />
                          <ListItemText primary={c} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </MuiThemeProvider>
              </Grid>
              <Grid item md={5} className={classes.gridItem}>
                <MuiThemeProvider theme={themeAlt}>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="category">Category</InputLabel>
                    <Select
                      value={this.state.category}
                      onChange={this.handleChange('category')}
                      inputProps={{
                        name: 'category',
                        id: 'category'
                      }}
                    >
                      {category.map(c => (
                        <MenuItem key={c} value={c}>
                          {c}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </MuiThemeProvider>
              </Grid>
              <Grid item md={2} className={classes.gridItem}>
                <Button color="primary" variant="contained" style={{ color: 'white' }}>
                  Search
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </>
    );
  }
}
type StyledProps = StateProps & DispatchProps & StyledComponentProps<string>;
export const LandingPage: React.ComponentType<StyledProps> = withTheme()(withStyles(styles)(InternalLandingPage));
