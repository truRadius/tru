/* tslint:disable */ //toavoid unnecessary semicolon errors

import * as React from 'react';
import classNames from 'classnames';
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
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  ListItemText,
  Checkbox,
  Input,
  InputAdornment,
  IconButton
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
  paper: {
    position: 'absolute',
    width: '50%',
    borderRadius: '5%',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    textAlign: 'center',
    margin: '5% 30%'
  },
  root: {
    width: '60%'
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
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default
    }
  },
  label: {
    textAlign: 'center',
    fontSize: '2em'
  },
  submitBtn: {
    width: theme.spacing.unit,
    marginLeft: theme.spacing.unit * 20
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
  }
});

type PropsWithStyles = StateProps &
  DispatchProps &
  WithTheme &
  WithStyles<
    | 'button'
    | 'paper'
    | 'root'
    | 'tableCell'
    | 'textField'
    | 'table'
    | 'row'
    | 'label'
    | 'submitBtn'
    | 'menu'
    | 'formControl'
    | 'personalizedModal'
    | 'orangeSpan'
    | 'margin'
  >;

// const stateCode = [{ code: 'FL', id: 1 }, { code: 'CA', id: 2 }, { code: 'TN', id: 3 }];
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
    cause: this.cause,
    zipcode: '',
    city: '',
    phoneNumber: '',
    email: '',
    password: '',
    showPassword: false,
    passCheck: ''
  };
  unique = 1;

  propTypes = {
    classes: PropTypes.object.isRequired
  };

  handleOpenModal = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleCauseChange = (event: any) => {
    this.setState({ cause: event.target.value });
  };

  handleNameChange = (event: any) => {
    this.setState({ groupName: event.target.value });
  };

  handleZipcodeChange = (event: any) => {
    // const reg = new RegExp('/[^0-9]');
    const onlyNums = event.target.value.replace(/[^0-9]/, '');
    // const onlyNums = reg.test(event.target.value) ? event.target.value : event.target.value.slice(0, -1);
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
      this.setState({ city: cs });
    } else {
      // this.setState({ city: 'undefined' });
      alert('Incorrect zipcode! Try again.');
    }
  };

  handleNumberChange = (e: any) => {
    const onlyNums = e.target.value.replace(/[^0-9]/, '');
    console.log('Here:', onlyNums);
    if (onlyNums.length < 10) {
      this.setState({ phoneNumber: onlyNums });
    } else if (onlyNums.length === 10) {
      const number = onlyNums.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
      this.setState({ phoneNumber: number });
    }
  };

  handleEmailChange = (event: any) => {
    // /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.setState({ email: event.target.value });
  };

  handlePasswordChange = (event: any) => {
    this.setState({ password: event.target.value });
  };

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleCheckPassword = (e: any) => {
    this.setState({ passCheck: e.target.value });
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
          onClose={this.handleClose}
          className={classes.personalizedModal}
        >
          <div className={classes.paper}>
            <form>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.tableCell} text-align="center" colSpan={2}>
                      <label className={classes.label}>Register</label>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.tableCell} text-align="center" colSpan={2}>
                      Sign up in order to enjoy <span className={classes.orangeSpan}>tru</span>
                      Radius's full services.
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell className={classes.tableCell}>
                      <TextField
                        id="standard-fname"
                        label="First Name"
                        className={classes.textField}
                        value=""
                        onChange={this.handleNameChange}
                        margin="normal"
                      />
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      <TextField
                        id="standard-lname"
                        label="Last Name"
                        className={classes.textField}
                        value=""
                        onChange={this.handleNameChange}
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
                        value={this.state.defaultState} // onChange={this.handleChange('currency')}
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
                          multiple
                          value={this.state.cause}
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
                        value={this.state.city}
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
                        id="standard-email"
                        label="Email"
                        className={classes.textField}
                        value={this.state.email}
                        onChange={this.handleEmailChange}
                        margin="normal"
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.tableCell}>
                      <FormControl className={classNames(classes.margin, classes.textField)}>
                        <InputLabel htmlFor="adornment-password">Password</InputLabel>
                        <Input
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
                    <TableCell className={classes.tableCell}>
                      <TextField
                        id="standard-password"
                        type="password"
                        label="Confirm Password"
                        className={classes.textField}
                        value={this.state.passCheck}
                        onChange={this.handleCheckPassword}
                        margin="normal"
                      />
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
        </Modal>
      </div>
    );
  }
}

type StyledProps = StateProps & DispatchProps & StyledComponentProps<string>;
export const CreateGroupModal: React.ComponentType<StyledProps> = withTheme()(withStyles(styles)(CreateModal));
export default CreateGroupModal;
