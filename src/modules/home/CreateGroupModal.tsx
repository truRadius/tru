/* tslint:disable */ //toavoid 'unnecessary-semicolon' errors

import * as React from 'react';
// import classNames from 'classnames';
import {
  Modal,
  withStyles,
  Theme,
  StyledComponentProps,
  withTheme,
  Button,
  WithTheme,
  WithStyles,
  TextField,
  MenuItem,
  // FormControl,
  InputLabel,
  Input,
  Checkbox,
  ListItemText,
  InputAdornment,
  IconButton,
  Select,
  Grid,
  Paper
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
let zipcodes = require('zipcodes');
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import * as PropTypes from 'prop-types';

interface StateProps {}

interface DispatchProps {}

interface InternalState {}

// www.npmjs.com/package/zipcodes - to convert zipcode to city and state
const styles = (theme: Theme): { [key: string]: CSSProperties } => ({
  paperModal: {
    position: 'absolute',
    width: '50%',
    backgroundColor: 'none',
    borderRadius: '5%',
    // boxShadow: theme.shadows[5],
    textAlign: 'center',
    margin: '5% 30%'
  },
  paper: {
    textAlign: 'center',
    color: '#2E4C63',
    boxShadow: 'none',
    borderRadius: 0,
    backgroundColor: 'transparent'
  },
  root: {
    flexGrow: 1,
    backgroundColor: '#E8E8E8',
    borderRadius: '5%'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  table: {
    minWidth: '100%'
  },
  tableCell: {
    border: 'none'
  },
  label: {
    textAlign: 'center',
    fontSize: '2em'
  },
  submitBtn: {
    width: theme.spacing.unit,
    marginLeft: theme.spacing.unit * 20
  },
  wrapText: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
    whiteSpace: 'normal'
  },
  menu: {
    width: 200
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    maxWidth: 400
  },
  orangeSpan: {
    color: '#F17820',
    fontSize: '1em'
  },
  errorSpan: {
    color: 'red',
    fontSize: '1em'
  },
  formDiv: {
    width: '100%',
    backgroundColor: 'yellow'
  }
});

type PropsWithStyles = StateProps &
  DispatchProps &
  WithTheme &
  WithStyles<
    | 'button'
    | 'paper'
    | 'paperModal'
    | 'root'
    | 'tableCell'
    | 'textField'
    | 'table'
    | 'label'
    | 'submitBtn'
    | 'wrapText'
    | 'menu'
    | 'formControl'
    | 'personalizedModal'
    | 'orangeSpan'
    | 'errorSpan'
    | 'margin'
    | 'formDiv'
    | 'bgColorModal'
  >;

const gender = ['Male', 'Female', 'Other'];
const causes = ['Feed homeless', 'Run for cancer', 'Awarness'];
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

class CreateModal extends React.PureComponent<PropsWithStyles, InternalState> {
  cause: Array<string> = [];
  state = {
    open: false,
    defaultState: '',
    firstName: '',
    lastName: '',
    gender: '',
    cause: this.cause,
    zipcode: '',
    cs: '',
    city: '',
    state: '',
    phoneNumber: '',
    email: '',
    password: '',
    showPassword: false,
    passCheck: '',
    errStack: '',
    unformattedPhoneNumber: ''
  };
  unique = 1;

  propTypes = {
    classes: PropTypes.object.isRequired
  };

  handleOpenModal = () => {
    this.setState({ open: true });
  };

  handleCloseModal = () => {
    this.setState({ open: false });
  };

  handleCauseChange = (event: any) => {
    this.setState({ cause: event.target.value });
  };

  handleZipcodeChange = (event: any) => {
    const onlyNums = event.target.value.replace(/[^0-9]/, '');
    console.log('Onlynums:', onlyNums);
    if (onlyNums.length < 5) {
      this.setState({ zipcode: onlyNums });
    } else if (onlyNums.length === 5) {
      this.setState({ zipcode: onlyNums });
      this.findCityState(onlyNums);
    }
  };

  findCityState = (nums: number) => {
    if (zipcodes.lookup(nums) !== undefined) {
      let city = zipcodes.lookup(nums).city;
      let state = zipcodes.lookup(nums).state;
      let cs = `${city}, ${state}`;
      this.setState({ cs: cs, city: city, state: state });
    } else {
      alert('Incorrect zipcode! Try again.');
    }
  };

  handleNumberChange = (e: any) => {
    const onlyNums = e.target.value.replace(/[^0-9]/, '');
    if (onlyNums.length < 10) {
      this.setState({ phoneNumber: onlyNums });
    } else if (onlyNums.length === 10) {
      this.setState({ unformattedPhoneNumber: onlyNums });
      const number = onlyNums.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
      this.setState({ phoneNumber: number });
    }
  };

  handleEmailChange = (event: any) => {
    this.setState({ email: event.target.value });
  };

  handlePasswordChange = (event: any) => {
    this.setState({ password: event.target.value });
  };

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleFirstName = (e: any) => {
    this.setState({ firstName: e.target.value });
  };
  handleLastName = (e: any) => {
    this.setState({ lastName: e.target.value });
  };
  handleGenderChange = (e: any) => {
    this.setState({ gender: e.target.value });
  };

  errStack = '';
  validateEmail = () => {
    let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (reg.test(this.state.email) === false) {
      this.errStack = 'Invalid Email';
      this.setState({ errStack: this.errStack });
    } else {
      this.errStack = '';
      this.setState({ errStack: this.errStack });
    }
  };

  createUserObj = () => {
    return new Promise((resolve, reject) => {
      let userObj = {
        fname: this.state.firstName,
        lname: this.state.lastName,
        gender: this.state.gender,
        causes: this.state.cause,
        zipcode: this.state.zipcode,
        city: this.state.city,
        state: this.state.state,
        email: this.state.email,
        password: this.state.password,
        phoneNumber: this.state.unformattedPhoneNumber
      };
      resolve(userObj);
    });
  };

  onFormSubmit = () => {
    if (this.state.errStack.length > 0) {
      this.setState({ errStack: this.state.errStack });
    } else {
      this.createUserObj().then(data => {
        localStorage.setItem('UserObj', JSON.stringify(data)); //TODO: change it to actual database once ready
      });
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button color="primary" onClick={this.handleOpenModal} aria-label="Register" className={classes.button}>
          Register
        </Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleCloseModal}
          className={classes.paperModal}
        >
          <div className={classes.root}>
            <form onSubmit={this.onFormSubmit}>
              <Grid container spacing={16}>
                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    Sign up to enjoy what <span className={classes.orangeSpan}>tru</span>
                    Radius has to offer.
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper className={classes.paper}>
                    <TextField
                      required
                      id="standard-fname"
                      label="First Name"
                      className={classes.textField}
                      value={this.state.firstName}
                      onChange={this.handleFirstName}
                      margin="normal"
                    />
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper className={classes.paper}>
                    <TextField
                      required
                      id="standard-lname"
                      label="Last Name"
                      className={classes.textField}
                      value={this.state.lastName}
                      onChange={this.handleLastName}
                      margin="normal"
                    />
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper className={classes.paper}>
                    <TextField
                      id="standard-select-gender"
                      select
                      label="Gender"
                      className={classes.textField}
                      value={this.state.gender}
                      onChange={this.handleGenderChange}
                      SelectProps={{ MenuProps: { className: classes.menu } }}
                      margin="normal"
                    >
                      {gender.map(g => (
                        <MenuItem key={g} value={g}>
                          {g}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper className={classes.paper}>
                    {/* <FormControl className={classes.formControl}> */}
                    <InputLabel className={classes.textField} htmlFor="select-multiple-checkbox">
                      Select causes
                    </InputLabel>
                    <Select
                      required
                      multiple
                      value={this.state.cause}
                      // className={classes.wrapText}
                      onChange={this.handleCauseChange}
                      input={<Input multiline className={classes.wrapText} id="select-multiple-checkbox" />}
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
                    {/* </FormControl> */}
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper className={classes.paper}>
                    <TextField
                      required
                      id="standard-zipcode"
                      label="Zipcode"
                      className={classes.textField}
                      value={this.state.zipcode}
                      onChange={this.handleZipcodeChange}
                      margin="normal"
                    />
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper className={classes.paper}>
                    <TextField
                      disabled
                      id="standard-city"
                      label="City"
                      className={classes.textField}
                      value={this.state.city}
                      margin="normal"
                    />
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper className={classes.paper}>
                    <TextField
                      disabled
                      id="standard-state"
                      label="State"
                      className={classes.textField}
                      value={this.state.state}
                      margin="normal"
                    />
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper className={classes.paper}>
                    <TextField
                      id="standard-number"
                      label="Phone Number"
                      className={classes.textField}
                      value={this.state.phoneNumber}
                      onChange={this.handleNumberChange}
                      margin="normal"
                    />
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper className={classes.paper}>
                    <TextField
                      required
                      onBlur={this.validateEmail}
                      id="standard-email"
                      label="Email"
                      className={classes.textField}
                      value={this.state.email}
                      onChange={this.handleEmailChange}
                      margin="normal"
                      helperText={<span className={classes.errorSpan}>{this.state.errStack}</span>}
                    />
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper className={classes.paper}>
                    {/* <FormControl className={classNames(classes.margin, classes.textField)}> */}
                    <InputLabel className={classes.textField} htmlFor="adornment-password">
                      Password
                    </InputLabel>
                    <Input
                      required
                      id="adornment-password"
                      type={this.state.showPassword ? 'text' : 'password'}
                      value={this.state.password}
                      onChange={this.handlePasswordChange}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton aria-label="Toggle password visibility" onClick={this.handleClickShowPassword}>
                            {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper className={classes.paper}>
                    <Button color="primary" className={classes.button} type="cancel">
                      Cancel
                    </Button>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper className={classes.paper}>
                    <Button color="primary" className={classes.button} type="submit">
                      Submit
                    </Button>
                  </Paper>
                </Grid>
              </Grid>
            </form>
          </div>
          {/* <div className={classes.paper}>
            <div className={classes.formDiv}>
              <form onSubmit={this.onFormSubmit}>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell className={classes.tableCell} text-align="center" colSpan={2}>
                        <label className={classes.label}>Register</label>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className={classes.tableCell} text-align="center" colSpan={2}>
                        Sign up to enjoy what <span className={classes.orangeSpan}>tru</span>
                        Radius has to offer.
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell className={classes.tableCell}>
                        <TextField
                          required
                          id="standard-fname"
                          label="First Name"
                          className={classes.textField}
                          value={this.state.firstName}
                          onChange={this.handleFirstName}
                          margin="normal"
                        />
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        <TextField
                          required
                          id="standard-lname"
                          label="Last Name"
                          className={classes.textField}
                          value={this.state.lastName}
                          onChange={this.handleLastName}
                          margin="normal"
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className={classes.tableCell}>
                        <TextField
                          id="standard-select-gender"
                          select
                          label="Gender"
                          className={classes.textField}
                          value={this.state.gender}
                          onChange={this.handleGenderChange}
                          SelectProps={{ MenuProps: { className: classes.menu } }}
                          margin="normal"
                        >
                          {gender.map(g => (
                            <MenuItem key={g} value={g}>
                              {g}
                            </MenuItem>
                          ))}
                        </TextField>
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        <FormControl className={classes.formControl}>
                          <InputLabel className={classes.textField} htmlFor="select-multiple-checkbox">
                            Select causes
                          </InputLabel>
                          <Select
                            required
                            multiple
                            value={this.state.cause}
                            className={classes.wrapText}
                            onChange={this.handleCauseChange}
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
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className={classes.tableCell}>
                        <TextField
                          required
                          id="standard-zipcode"
                          label="Zipcode"
                          className={classes.textField}
                          value={this.state.zipcode}
                          onChange={this.handleZipcodeChange}
                          margin="normal"
                        />
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        <TextField
                          disabled
                          id="standard-city"
                          label="City"
                          className={classes.textField}
                          value={this.state.cs}
                          margin="normal"
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className={classes.tableCell}>
                        <TextField
                          id="standard-number"
                          label="Phone Number"
                          className={classes.textField}
                          value={this.state.phoneNumber}
                          onChange={this.handleNumberChange}
                          margin="normal"
                        />
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        <TextField
                          required
                          onBlur={this.validateEmail}
                          id="standard-email"
                          label="Email"
                          className={classes.textField}
                          value={this.state.email}
                          onChange={this.handleEmailChange}
                          margin="normal"
                          helperText={<span className={classes.errorSpan}>{this.state.errStack}</span>}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className={classes.tableCell}>
                        <FormControl className={classNames(classes.margin, classes.textField)}>
                          <InputLabel htmlFor="adornment-password">Password</InputLabel>
                          <Input
                            required
                            id="adornment-password"
                            type={this.state.showPassword ? 'text' : 'password'}
                            value={this.state.password}
                            onChange={this.handlePasswordChange}
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="Toggle password visibility"
                                  onClick={this.handleClickShowPassword}
                                >
                                  {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                              </InputAdornment>
                            }
                          />
                        </FormControl>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell />
                      <TableCell className={classes.tableCell}>
                        <Button color="primary" className={classes.button} type="cancel">
                          Cancel
                        </Button>
                        <Button color="primary" className={classes.button} type="submit">
                          Submit
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </form>
            </div>
          </div> */}
        </Modal>
      </div>
    );
  }
}

type StyledProps = StateProps & DispatchProps & StyledComponentProps<string>;
export const CreateGroupModal: React.ComponentType<StyledProps> = withTheme()(withStyles(styles)(CreateModal));
export default CreateGroupModal;
