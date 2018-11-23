/* tslint:disable */ //toavoid unnecessary semicolon errors

import * as React from 'react';
import { StyledComponentProps, withTheme } from '@material-ui/core';
import { NavBar } from './layout/Navbar/NavBar';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Profile } from './Profile/ViewUserProfile';
import { Footer } from './layout/Footer';
import { LandingPage } from './LandingPage/LandingPage';
import { Home } from './home/Home';

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
    if (window.localStorage.UserObj) {
      this.setState({ loggedIn: true });
    } else this.setState({ loggedIn: false });
  };

  componentDidMount = () => {
    console.log(window.sessionStorage, 'Whats the localStorage');
  };
  render() {
    return (
      <Router>
        <div>
          <nav>
            <NavBar isLoggedIn={this.isLoggedIn} loggedIn={this.state.loggedIn} />
          </nav>
          <main>
            {this.state.loggedIn ? (
              <Route exact path="/" render={() => <Home />} />
            ) : (
              <Route exact path="/" render={() => <LandingPage />} />
            )}
            {/* TODO: profile will eventually change to profile/:id for viewing particular user's profile */}
            <Route exact path="/profile" render={() => <Profile />} />
          </main>
          <footer>
            <Footer isLoggedIn={this.isLoggedIn} />
          </footer>
        </div>
      </Router>
    );
  }
}
type StyledProps = StateProps & DispatchProps & StyledComponentProps<string>;
export const App: React.ComponentType<StyledProps> = withTheme()(InternalApp);
