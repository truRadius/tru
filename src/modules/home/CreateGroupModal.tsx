/* tslint:disable */
import * as React from 'react';
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
  Input
} from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import * as PropTypes from 'prop-types';

interface StateProps {}

interface DispatchProps {}

interface InternalState {}

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#686868',
    width: '100%',
    color: '#fff',
    fontSize: '2em'
  },
  body: {
    fontSize: '1em',
    width: '50%'
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    maxWidth: 300
  }
}))(TableCell);

const styles = (theme: Theme): { [key: string]: CSSProperties } => ({
  paper: {
    position: 'absolute',
    width: '50%',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    textAlign: 'center',
    margin: '5% 30%'
  },
  root: {
    width: '60%'
  },
  textField: {
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    textAlign: 'center'
  },
  table: {
    minWidth: '100%'
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default
    }
  },
  label: {
    textAlign: 'center'
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
    maxWidth: 300
  }
});

type PropsWithStyles = StateProps &
  DispatchProps &
  WithTheme &
  WithStyles<
    'button' | 'paper' | 'root' | 'textField' | 'table' | 'row' | 'label' | 'submitBtn' | 'menu' | 'formControl'
  >;

const stateCode = [{ code: 'FL', id: 1 }, { code: 'CA', id: 2 }, { code: 'TN', id: 3 }];
const causes = ['Feed homeless', 'Run for cancer'];
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
  state = {
    open: false,
    defaultState: 'FL',
    cause: ['']
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

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button
          color="primary"
          variant="extendedFab"
          onClick={this.handleOpenModal}
          aria-label="Delete"
          className={classes.button}
        >
          Create Group
        </Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div className={classes.paper}>
            <form>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <CustomTableCell text-align="center">
                      <label className={classes.label}>Create Group</label>
                    </CustomTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <TextField
                        id="standard-groupName"
                        fullWidth
                        label="Group Name"
                        className={classes.textField}
                        value=""
                        onChange={this.handleNameChange}
                        margin="normal"
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <TextField
                        id="standard-name"
                        label="City"
                        className={classes.textField}
                        value="" // onChange={this.handleChange('name')}
                        margin="normal"
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <TextField
                        id="standard-select-currency"
                        select
                        label="State"
                        className={classes.textField}
                        value={this.state.defaultState} // onChange={this.handleChange('currency')}
                        SelectProps={{ MenuProps: { className: classes.menu } }}
                        margin="normal"
                      >
                        {stateCode.map(option => (
                          <MenuItem key={option.id} value={option.code}>
                            {option.code}
                          </MenuItem>
                        ))}
                      </TextField>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <TextField
                        id="standard-name"
                        label="Zip Code"
                        className={classes.textField}
                        value="" // onChange={this.handleChange('city')}
                        margin="normal"
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="select-multiple-checkbox">Select causes</InputLabel>
                        <Select
                          multiple
                          value={this.state.cause}
                          onChange={this.handleCauseChange}
                          input={<Input id="select-multiple-checkbox" />}
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
                    <TableCell>
                      <TextField
                        id="standard-description"
                        multiline
                        fullWidth
                        label="Description"
                        className={classes.textField}
                        value="" // onChange={this.handleChange('name')}
                        margin="normal"
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <CustomTableCell>
                      <Button color="primary" className={classes.button} type="submit" variant="extendedFab">
                        Submit
                      </Button>
                    </CustomTableCell>
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
