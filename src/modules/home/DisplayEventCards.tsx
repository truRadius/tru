/* tslint:disable */

import * as React from 'react';

import {
  Theme,
  WithStyles,
  withTheme,
  WithTheme,
  StyledComponentProps,
  withStyles,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Grid
} from '@material-ui/core';

import { CSSProperties } from '@material-ui/core/styles/withStyles';

interface StateProps {}

interface DispatchProps {}

interface InternalState {}

const styles = (theme: Theme): { [key: string]: CSSProperties } => ({
  root: {},
  card: {
    maxWidth: '90%',
    margin: '0 auto'
  }
});

type PropsWithStyles = StateProps & DispatchProps & WithTheme & WithStyles<'root' | 'card'>;

class InternalEventCards extends React.PureComponent<PropsWithStyles, InternalState> {
  state: {};

  createCard = () => {
    return (
      <Card className={this.props.classes.card} style={{ margin: '5% auto' }}>
        <CardActionArea>
          <CardContent>
            <Grid container alignContent="center" justify="space-evenly" direction="row" spacing={24}>
              <Grid sm={2} style={{ margin: '16px' }}>
                <Grid container alignContent="center" justify="flex-start" direction="column">
                  <Grid sm style={{ color: '#F17820', fontSize: '3.4em' }}>
                    29
                  </Grid>
                  <Grid sm style={{ fontSize: '2em' }}>
                    Sep
                  </Grid>
                </Grid>
              </Grid>
              <Grid sm style={{ margin: '16px' }}>
                <Typography gutterBottom variant="h5" component="h2">
                  Feed the Homeless
                </Typography>
                <Typography component="p">8-am SanJose, CA </Typography>
                <Typography component="p">12 people are planning to attend</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  };

  render() {
    // const { classes } = this.props;
    return (
      <div>
        <Grid container alignContent="center" justify="space-evenly" direction="row">
          <Grid sm>{this.createCard()}</Grid>
          <Grid sm>{this.createCard()}</Grid>
        </Grid>
        <Grid container alignContent="center" justify="space-evenly" direction="row">
          <Grid sm>{this.createCard()}</Grid>
          <Grid sm>{this.createCard()}</Grid>
        </Grid>
        <Grid container alignContent="center" justify="space-evenly" direction="row">
          <Grid sm>{this.createCard()}</Grid>
          <Grid sm>{this.createCard()}</Grid>
        </Grid>
      </div>
    );
  }
}

type StyledProps = StateProps & DispatchProps & StyledComponentProps<string>;
export const DisplayEventCards: React.ComponentType<StyledProps> = withTheme()(withStyles(styles)(InternalEventCards));
export default DisplayEventCards;
