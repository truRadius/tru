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
  Input,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  Button
} from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import {
  Grid,
  FormControl,
  InputBase,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { DisplayEventCards } from './DisplayEventCards';
import { DisplayOrgCards } from './DisplayOrgCards';
import axios from 'axios';

interface StateProps {}

interface DispatchProps {}

interface InternalState {}

const styles = (theme: Theme): { [key: string]: CSSProperties } => ({
  root: {},
  toggleContainer: {
    height: 56,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    display: 'flex',
    justifyContent: 'space-evenly',
    margin: `${theme.spacing.unit}px 0`,
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
    color: '#f17820',
    '&:hover': {
      background: '#E8E8E8'
    }
  },
  formControl: {
    minWidth: 120,
    width: '100%',
    justifyContent: 'space-evenly',
    color: 'white'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
    fontWeight: 600,
    color: '#0000008a'
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
    backgroundColor: 'white',
    justifyContent: 'space-evenly'
  },
  gridItem: {
    padding: 8
  },
  moreOptionPanel: {
    width: '80%',
    margin: '0 auto',
    maxWidth: 1000,
    paddingTop: 0,
    paddingBottom: 10
  },
  whiteText: {
    color: 'white'
  },
  spacerDiv: {
    marginBottom: '30px'
  },
  displayDiv: {
    width: '80%',
    maxWidth: 1000,
    margin: '0 auto'
  }
});

type PropsWithStyles = StateProps &
  DispatchProps &
  WithTheme &
  WithStyles<
    | 'root'
    | 'mainDiv'
    | 'toggleContainer'
    | 'customButton'
    | 'toggleBtn'
    | 'toggleGroup'
    | 'activeBtn'
    | 'formControl'
    | 'inputInput'
    | 'displayDiv'
    | 'heading'
    | 'gridItem'
    | 'moreOptionPanel'
    | 'whiteText'
    | 'spacerDiv'
  >;
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

class InternalHome extends React.PureComponent<PropsWithStyles, InternalState> {
  causes: Array<string> = [];
  state = {
    selected: 'organizations',
    expanded: false,
    cause: this.causes,
    distance: 10,
    search_text: '',
    results: {
      data: []
    }
  };
  unique = 1;
  handleMoreOption = () => {
    this.setState({
      expanded: !this.state.expanded
    });
  };

  // tslint:disable-next-line:no-any
  handleChange = (name: string) => (event: any) => {
    this.setState({ [name]: event.target.value });
  };

  // tslint:disable-next-line:no-any
  handleToggle = (e: any) => {
    this.setState({ selected: e.target.id });
  };

  // tslint:disable-next-line:no-any
  onTextChange = (e: any) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = () => {
    const { search_text, distance } = this.state;

    axios
      .post('http://localhost:8000/api/externalApi', { search_text, distance })
      .then(res => this.setState({ results: res }))
      // tslint:disable-next-line:no-console
      .catch((err: any) => console.log(err));
    // tslint:disable-next-line:no-console
    console.log('results', this.state.results);
  };

  render() {
    const { classes } = this.props;
    const { search_text, results } = this.state;
    return (
      <div>
        <div className={classes.mainDiv}>
          <Grid container spacing={24} direction="column" style={{ width: '80%', margin: '0 auto', maxWidth: 1000 }}>
            <Grid container alignItems="center" direction="row" justify="space-evenly">
              <Grid item xs>
                <FormControl className={classes.formControl}>
                  <InputBase
                    name="search_text"
                    value={search_text}
                    onChange={this.onTextChange}
                    fullWidth
                    placeholder="Search"
                    classes={{ input: classes.inputInput }}
                  />
                  <Button onClick={this.onSubmit} color="secondary" variant="contained">
                    Search
                  </Button>
                </FormControl>
              </Grid>

              <Grid item xs>
                <div className={classes.toggleContainer}>
                  <ToggleButtonGroup className={classes.toggleGroup} exclusive onClick={this.handleToggle}>
                    <ToggleButton
                      id="event"
                      value="event"
                      style={{ padding: '0 30px' }}
                      className={this.state.selected === 'events' ? classes.activeBtn : classes.toggleBtn}
                    >
                      <span id="events" className={classes.customButton}>
                        Events
                      </span>
                    </ToggleButton>
                    <ToggleButton
                      value="organization"
                      id="organization"
                      style={{ padding: '0 30px' }}
                      className={this.state.selected === 'organizations' ? classes.activeBtn : classes.toggleBtn}
                    >
                      <span id="organizations" className={classes.customButton}>
                        Organizations
                      </span>
                    </ToggleButton>
                  </ToggleButtonGroup>
                </div>
              </Grid>
            </Grid>
          </Grid>
          <ExpansionPanel expanded={this.state.expanded} onChange={this.handleMoreOption}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              style={{ width: '80%', margin: '0 auto', maxWidth: 1000 }}
            >
              <Typography className={classes.heading}>More Options</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.moreOptionPanel}>
              <Grid item md={12} container alignItems="center">
                <Grid item md className={classes.gridItem}>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="causes">
                      <Typography>Causes</Typography>
                    </InputLabel>
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
                          <Typography>
                            <ListItemText primary={c} />
                          </Typography>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item md={2} className={classes.gridItem}>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="distance">
                      <Typography>Distance</Typography>
                    </InputLabel>
                    <Select
                      fullWidth
                      value={this.state.distance}
                      onChange={this.handleChange('distance')}
                      inputProps={{ name: 'distance', id: 'distance', style: { color: 'white' } }}
                    >
                      {distance.map(d => (
                        <MenuItem key={d} value={d}>
                          <Typography>{d} Miles</Typography>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
        <div className={classes.spacerDiv} />
        <div className={classes.displayDiv}>
          {this.state.selected === 'event' ? <DisplayEventCards /> : <DisplayOrgCards orgs={results.data} />}
        </div>
      </div>
    );
  }
}
type StyledProps = StateProps & DispatchProps & StyledComponentProps<string>;
export const Home: React.ComponentType<StyledProps> = withTheme()(withStyles(styles)(InternalHome));
export default Home;
