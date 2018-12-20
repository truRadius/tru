/* tslint:disable */ //toavoid unnecessary semicolon errors

import * as React from 'react';
import { StyledComponentProps, withTheme } from '@material-ui/core';
import { NavBar } from './layout/Navbar/NavBar';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Profile } from './Profile/ViewUserProfile';
import { Footer } from './layout/Footer';
import { LandingPage } from './LandingPage/LandingPage';
import { Home } from './home/Home';
import { OrganizationProfile } from './Profile/OrganizationProfile';
import { CreateEventForm } from './Events/CreateEventForm';
import { EventProfile } from './Profile/EventProfile';

// import { library } from '@fortawesome/fontawesome-svg-core';
// import { faStroopwafel } from '@fortawesome/free-solid-svg-icons';

interface StateProps {}
interface DispatchProps {}
interface InternalState {}

class InternalApp extends React.PureComponent<InternalState> {
  state = {
    loggedIn: false
  };

  isLoggedIn = () => {
    if (window.sessionStorage.UserObj) {
      this.setState({ loggedIn: true });
    } else this.setState({ loggedIn: false });
  };

  render() {
    return (
      <Router>
        <div>
          <nav>
            <NavBar isLoggedIn={this.isLoggedIn} loggedIn={this.state.loggedIn} />
          </nav>
          {this.state.loggedIn ? (
            <main>
              <Route exact path="/" render={() => <Home />} />
              {/* TODO: profile will eventually change to profile/:id for viewing particular user's profile */}
              <Route exact path="/profile/:id" render={() => <Profile />} />
              <Route exact path="/event" render={() => <CreateEventForm />} />
              <Route exact path="/organization/:id" render={() => <OrganizationProfile />} />
              <Route
                exact
                path="/event/:id"
                render={(props: any) => {
                  return <EventProfile {...props} />;
                }}
              />
            </main>
          ) : (
            <Route exact path="/" render={() => <LandingPage />} />
          )}
          <footer>
            <Footer isLoggedIn={this.isLoggedIn} />
          </footer>
        </div>
      </Router>
    );
  }
}
type StyledProps = StateProps & DispatchProps & StyledComponentProps<any>;
export const App: React.ComponentType<StyledProps> = withTheme()(InternalApp);
