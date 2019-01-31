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
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  FormHelperText,
  Grid,
  FormControl,
} from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { DisplayEventCards } from './DisplayEventCards';
import { DisplayOrgCards } from './DisplayOrgCards';
import { connect } from 'react-redux';
import { fetchOrganizations, fetchCauses, updateSearchRadius, updateSearchCauses } from 'src/actions/searchActions';
import { SearchState } from 'src/reducers';
import { Causes } from 'src/api/causes';
import { SearchBody } from 'src/api/searchBody';
import { fetchUser } from 'src/actions/userActions';
// import axios from 'axios';

interface StateProps {
  body: SearchBody;
  organizations: any;
  // redux5: added the cause prop here. Defined the type in the api folder. I need to do the same for organizations
  // connected this cause to the state in the searchReducer at the bottom
  causes: Causes[];
}
interface DispatchProps {
  onFetchOrganizations: typeof fetchOrganizations;
  // redux7: actions go here and defined at the bottom as well
  onFetchCauses: typeof fetchCauses;
  onUpdateSearchRadius: typeof updateSearchRadius;
  onUpdateSearchCauses: typeof updateSearchCauses;
  onFetchUser: typeof fetchUser;
}

interface InternalState {
  resultsType: string;
  results: {
    // tslint:disable-next-line:no-any
    data: Array<any>;
    err: string;
  };
}

const styles = (theme: Theme): { [key: string]: CSSProperties } => ({
  root: {},
  toggleContainer: {
    height: 56,
    padding: 0,
    display: 'flex',
    justifyContent: 'space-evenly',
    margin: 0,
    maxWidth: '100%',
    flexBasis: '100%'
  },
  customButton: {
    borderRadius: 0,
    margin: 'auto 0'
  },
  mainDiv: {
    backgroundColor: '#ffffff',
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

type PropsWithStyles = StateProps & DispatchProps &
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

class InternalHome extends React.PureComponent<PropsWithStyles, InternalState> {
  state: InternalState = {
    resultsType: 'organization',
    results: {
      data: [],
      err: ''
    }
  };

  // tslint:disable-next-line:no-any
  handleChange = (name: string) => (event: any) => {
    const { onUpdateSearchCauses, onUpdateSearchRadius } = this.props;

    if (name === 'ntee_major_codes') {
      onUpdateSearchCauses(event.target.value);
    } else if (name === 'radius') {
      onUpdateSearchRadius(event.target.value);
    }
  };

  // tslint:disable-next-line:no-any
  handleToggle = (e: any) => {
    this.setState({ resultsType: e.target.value });
  };
  componentDidMount = () => {
    const { onFetchUser, onFetchCauses, onFetchOrganizations, body } = this.props;
    // redux8: this kicks off the api call action
    // i added the test string because it kept saying it expected an argument, but i don't need test there otherwise
    onFetchUser('test')
    onFetchCauses('test')
    onFetchOrganizations(body)
  };

  render() {
    const { classes, causes, body } = this.props;
    const { results, resultsType } = this.state;
    return (
      <div>
        <div className={classes.mainDiv}>
          <Grid container spacing={24} direction="column" style={{ width: '80%', margin: '0 auto', maxWidth: 1000 }}>
            <Grid container alignItems="center" direction="row" justify="space-evenly">
              <Grid item xs md={2}>
                <div className={classes.toggleContainer}>
                  <FormControl className={classes.formControl}>
                    <Select
                      value={resultsType}
                      onChange={this.handleToggle}
                      disableUnderline
                    >
                      <MenuItem value={'organization'}>Organizations</MenuItem>
                      <MenuItem value={'event'}>Events</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </Grid>
              <Grid item xs={6}>
                <Grid item md={12} container alignItems="center">
                  <Grid item md className={classes.gridItem}>
                    <FormControl className={classes.formControl}>
                      <Select
                        multiple
                        value={body.filters.organization.ntee_major_codes}
                        onChange={this.handleChange('ntee_major_codes')}
                        input={<Input id="select-multiple-checkbox" />}
                        renderValue={
                          (selected: string[]) => {
                            const newArr: string[] = [];
                            selected.map((s: any) => {
                              let cause = causes.find(c => c.ntee_code === s);
                              newArr.push(cause ? cause.CauseName : '');
                            })
                            return newArr.join('; ');
                          }
                        }
                        MenuProps={MenuProps}
                      >
                        {causes.map((c: any) => (
                            <MenuItem key={c.Casues_ID} value={c.ntee_code}>
                              <Checkbox
                                checked={body.filters.organization.ntee_major_codes.indexOf(c.ntee_code) > -1}
                              />
                              <Typography>
                                <ListItemText primary={c.CauseName} />
                              </Typography>
                            </MenuItem>
                          ))
                        }
                      </Select>
                      <FormHelperText>Causes</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item md={2} className={classes.gridItem}>
                    <FormControl className={classes.formControl}>
                      <Select
                        fullWidth
                        value={body.filters.geography.radius}
                        onChange={this.handleChange('radius')}
                        inputProps={{ name: 'radius', id: 'distance', style: { color: 'white' } }}
                      >
                        {distance.map(d => (
                          <MenuItem key={d} value={d}>
                            <Typography>{d} Miles</Typography>
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText>Distance</FormHelperText>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
        <div className={classes.spacerDiv} />
        <div className={classes.displayDiv}>
          {resultsType === 'event' ? (
            <DisplayEventCards />
          ) : (
            <DisplayOrgCards orgs={this.props.organizations} err={results.err} />
          )}
        </div>
      </div>
    );
  }
}

type StyledProps = StateProps & DispatchProps & StyledComponentProps<string>;
export const Home: React.ComponentType<StyledProps> = withTheme()(withStyles(styles)(InternalHome));
export default connect(
  (state: SearchState): StateProps => ({
    body: state.searchReducer.body,
    organizations: state.searchReducer.organizations,
    // redux6: the state variable here is mapped to searchstate from index in the reducer folder
    // this state is passed up to the causes prop
    causes: state.searchReducer.causes
  }),
  { 
    onFetchOrganizations: fetchOrganizations, 
    onFetchCauses: fetchCauses, 
    onUpdateSearchRadius: updateSearchRadius,
    onUpdateSearchCauses: updateSearchCauses,
    onFetchUser: fetchUser
  }
)(Home);
