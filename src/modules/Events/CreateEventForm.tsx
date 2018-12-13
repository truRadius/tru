/* tslint:disable */

import * as React from 'react';
// import axios from 'axios';
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
  // IconButton,
  Radio
} from '@material-ui/core';
// import { StarBorder } from '@material-ui/icons';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import art from './art.jpg';
import art2 from './art2.jpg';
import art3 from './art3.jpg';
import art4 from './art4.jpg';
import art5 from './art5.jpg';
import art6 from './art6.jpg';
import art7 from './art7.jpg';

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
  }
});

type PropsWithStyles = StateProps &
  DispatchProps &
  WithTheme &
  WithStyles<'root' | 'formDiv' | 'button' | 'input' | 'selectedImg' | 'title' | 'titleBar' | 'gridList' | 'carousel'>;

class CreateEvent extends React.PureComponent<PropsWithStyles, InternalState> {
  state = {
    image: '',
    file: '',
    selectedImage: ''
  };

  tileData = [
    {
      img: art,
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
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.setState({ [name]: event.target.result });
      };
      reader.readAsDataURL(event.target.files[0]);
    } else {
      this.setState({ [name]: event.target.value });
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
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
        {this.state.image === '' ? '' : <img src={this.state.image} className={classes.selectedImg} />}
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
                    classes={{
                      root: classes.titleBar,
                      title: classes.title
                    }}
                    actionIcon={
                      <Radio
                        className={classes.title}
                        checked={this.state.selectedImage === tile.title}
                        onChange={this.handleChange('selectedImage')}
                        value={tile.title}
                        name="radio-button-demo"
                        aria-label="A"
                      />
                    }
                  />
                </GridListTile>
              ))}
            </GridList>
          </div>
        </div>
      </div>
    );
  }
}

type StyledProps = StateProps & DispatchProps & StyledComponentProps<string>;
export const CreateEventForm: React.ComponentType<StyledProps> = withTheme()(withStyles(styles)(CreateEvent));
export default CreateEventForm;
