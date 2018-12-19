/* tslint:disable */

import * as React from 'react';
import axios from 'axios';
let request = require('superagent');
import {
  Theme,
  WithTheme,
  StyledComponentProps,
  withTheme,
  withStyles,
  WithStyles,
  Button,
  GridList,
  GridListTile,
  GridListTileBar,
  Grid,
  TextField,
  IconButton
} from '@material-ui/core';
import { StarBorder, StarRate } from '@material-ui/icons';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import art1 from './art.jpg';
import art2 from './art2.jpg';
import art3 from './art3.jpg';
import art4 from './art4.jpg';
import art5 from './art5.jpg';
import art6 from './art6.jpg';
import art7 from './art7.jpg';
let moment = require('moment');
let zipcodes = require('zipcodes');
interface StateProps {}

interface DispatchProps {}

interface InternalState {}

interface StateProps {
  // isLoggedIn: any;
}
const styles = (theme: Theme): { [key: string]: CSSProperties } => ({
  formDiv: {
    backgroundColor: 'white',
    color: '#F17820',
    fontFamily: 'arial rounded MT',
    fontStyle: 'italic',
    padding: '30px 50px',
    fontSize: '1.25em'
  },
  button: {
    margin: theme.spacing.unit,
    backgroundColor: '#F17820'
  },

  input: {
    display: 'none'
  },
  selectedImg: {
    width: '200px',
    height: '150px'
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)'
  },
  title: {
    color: theme.palette.primary.light
  },
  titleBar: {
    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
  },
  carousel: {
    padding: '20px 50px'
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  removeImage: {
    borderRadius: '100%',
    position: 'fixed',
    color: 'red',
    backgroundColor: 'white'
  }
});

type PropsWithStyles = StateProps &
  DispatchProps &
  WithTheme &
  WithStyles<
    | 'root'
    | 'formDiv'
    | 'button'
    | 'input'
    | 'selectedImg'
    | 'title'
    | 'titleBar'
    | 'gridList'
    | 'carousel'
    | 'paper'
    | 'textField'
    | 'container'
    | 'removeImage'
  >;

class CreateEvent extends React.PureComponent<PropsWithStyles, InternalState> {
  state = {
    image: '',
    selectedImage: '',
    eventName: '',
    streetAddress: '',
    city: '',
    zipcode: '',
    state: '',
    startDateTime: '',
    endDateTime: '',
    eventDescription: '',
    uploadedFileCloudinaryUrl: ''
  };

  tileData = [
    {
      img: art1,
      title: 'Art1'
    },
    {
      img: art2,
      title: 'Art2'
    },
    {
      img: art3,
      title: 'Art3'
    },
    {
      img: art4,
      title: 'Art4'
    },
    {
      img: art5,
      title: 'Art5'
    },
    {
      img: art6,
      title: 'Art6'
    },
    {
      img: art7,
      title: 'Art7'
    }
  ];

  handleChange = (name: string) => (event: any) => {
    if (name === 'image') {
      if (this.state.selectedImage === '') {
        // console.log(event.target.value);
        let reader = new FileReader();
        reader.onload = (event: any) => {
          this.setState({ [name]: event.target.result });
        };
        reader.readAsDataURL(event.target.files[0]);
        this.handleImageUpload(event.target.files[0]);
      } else {
        alert('You have already selected one from the list');
      }
    } else {
      this.setState({ [name]: event.target.value });
    }
  };

  handleImageChange = (event: any) => {
    if (this.state.image !== '') {
      alert('You have already uploaded an image');
    } else this.setState({ selectedImage: event.target.id });
  };

  handleZipcodeChange = (event: any) => {
    const onlyNums = event.target.value.replace(/[^0-9]/, '');
    // tslint:disable-next-line:no-console
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

  createEventObj = () => {
    return {
      selectedImage: this.state.selectedImage,
      eventName: this.state.eventName,
      street: this.state.streetAddress,
      city: this.state.city,
      zipcode: this.state.zipcode,
      state: this.state.state,
      startDateTime: moment(this.state.startDateTime).format('YYYY-MM-DD HH:mm:ss'),
      endDateTime: moment(this.state.endDateTime).format('YYYY-MM-DD HH:mm:ss'),
      eventDescription: this.state.eventDescription,
      uploadedFileCloudinaryUrl: this.state.uploadedFileCloudinaryUrl,
      currentUser: sessionStorage.getItem('UserObj')
    };
  };

  removeImage = () => {
    this.setState({ image: '' });
  };

  handleImageUpload(file: String) {
    let upload = request
      .post('https://api.cloudinary.com/v1_1/truradius/upload')
      .field('upload_preset', 'ek6zzccx')
      .field('api_key', '662119735487578')
      .field('api_secret', '2vgc24b_bx5qXSdq9PqpxH3WDLs')
      .field('file', file);
    upload.end((err: any, response: any) => {
      if (err) {
        console.error(err);
      }
      if (response.body.secure_url !== '') {
        this.setState({
          uploadedFileCloudinaryUrl: response.body.secure_url
        });
      }
    });
  }

  onSubmit = (event: any) => {
    // event.preventDefault();
    let date = new Date();
    date = moment(date).format('YYYY-MM-DD HH:mm:ss');
    //check if time is provided with date and that they are in future
    if (this.state.startDateTime === '' || this.state.endDateTime === '') {
      alert('Please provide time for the event');
    } else if (moment(this.state.endDateTime).isBefore(this.state.startDateTime)) {
      alert('Event cannot end before start date/time');
    } else if (moment(this.state.startDateTime).isBefore(date) && moment(this.state.endDateTime).isBefore(date)) {
      alert('Event cannot be in past. Please add future dates');
    } else {
      //create object
      let obj = this.createEventObj();
      console.log(obj);
      axios
        .post('http://localhost:8000/api/event', obj)
        .then(response => {
          console.log('Data submitted', response.data);
          //TODO: redirect to event profile page
        })
        .catch(err => {
          console.log(err, 'Error occured while trying to submit the data');
        });
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div className={classes.formDiv}>Create Event</div>
          <input
            accept=".png,.jpg,.jpeg"
            onChange={this.handleChange('image')}
            className={classes.input}
            id="contained-button-file"
            type="file"
            multiple
          />
          <label htmlFor="contained-button-file">
            <Button variant="contained" component="span" className={classes.button}>
              Upload Photo
            </Button>
          </label>
          {this.state.image === '' ? (
            ''
          ) : (
            <div>
              <img src={this.state.image} className={classes.selectedImg} />
              <button type="delete" className={classes.removeImage} onClick={this.removeImage}>
                x
              </button>
            </div>
          )}
          <span> - or - </span>
          <span>Select one from the list</span>
          <div id="img_carousel" className={classes.carousel}>
            <div className={classes.root}>
              <GridList className={classes.gridList} cols={2.5}>
                {this.tileData.map(tile => (
                  <GridListTile key={tile.img}>
                    <img src={tile.img} alt={tile.title} />
                    <GridListTileBar
                      title={tile.title}
                      classes={{ root: classes.titleBar, title: classes.title }}
                      actionIcon={
                        <IconButton id={tile.title} onClick={this.handleImageChange}>
                          {this.state.selectedImage !== '' && this.state.selectedImage === tile.title ? (
                            <StarRate className={classes.title} id={tile.title} />
                          ) : (
                            <StarBorder className={classes.title} id={tile.title} />
                          )}
                        </IconButton>
                      }
                    />
                  </GridListTile>
                ))}
              </GridList>
              <form>
                <Grid container spacing={16}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      required
                      id="standard-fname"
                      label="Event Name"
                      value={this.state.eventName}
                      onChange={this.handleChange('eventName')}
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      required
                      id="address"
                      label="Street Address"
                      value={this.state.streetAddress}
                      onChange={this.handleChange('streetAddress')}
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <TextField
                      fullWidth
                      required
                      id="standard-zipcode"
                      label="Zipcode"
                      value={this.state.zipcode}
                      onChange={this.handleZipcodeChange}
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <TextField
                      fullWidth
                      required
                      id="city"
                      label="City"
                      value={this.state.city}
                      onChange={this.handleChange('city')}
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <TextField
                      fullWidth
                      required
                      id="state"
                      label="State"
                      value={this.state.state}
                      onChange={this.handleChange('state')}
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <form className={classes.container} noValidate>
                      <TextField
                        required
                        id="start-datetime"
                        label="Start Date & Time"
                        type="datetime-local"
                        className={classes.textField}
                        value={this.state.startDateTime}
                        InputLabelProps={{
                          shrink: true
                        }}
                        onChange={this.handleChange('startDateTime')}
                      />
                    </form>
                  </Grid>
                  <Grid item xs={6}>
                    <form className={classes.container} noValidate>
                      <TextField
                        required
                        id="end-datetime"
                        label="End Date & Time"
                        type="datetime-local"
                        value={this.state.endDateTime}
                        className={classes.textField}
                        InputLabelProps={{
                          shrink: true
                        }}
                        onChange={this.handleChange('endDateTime')}
                      />
                    </form>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      required
                      id="description"
                      label="Event Description"
                      value={this.state.eventDescription}
                      onChange={this.handleChange('eventDescription')}
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Button color="primary" className={classes.button} type="submit">
                      <span style={{ color: 'white' }}>Submit</span>
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

type StyledProps = StateProps & DispatchProps & StyledComponentProps<string>;
export const CreateEventForm: React.ComponentType<StyledProps> = withTheme()(withStyles(styles)(CreateEvent));
export default CreateEventForm;
