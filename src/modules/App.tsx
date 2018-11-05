/* tslint:disable */ //toavoid unnecessary semicolon errors

import * as React from 'react';
import { StyledComponentProps, withTheme } from '@material-ui/core';
// import Main from './layout/Main';
import { NavBar } from './layout/Navbar/NavBar';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Footer } from './layout/Footer';
import { Home } from './home/Home';

interface StateProps {}
interface DispatchProps {}
interface InternalState {}
class InternalApp extends React.PureComponent<InternalState> {
  state = {};

  render() {
    return (
      <Router>
        <div>
          <nav>
            <NavBar />
          </nav>
          <main>
            <Route exact path="/" render={() => <Home />} />
          </main>
          <footer>
            <Footer />
          </footer>
        </div>
      </Router>
    );
  }
}
type StyledProps = StateProps & DispatchProps & StyledComponentProps<string>;
export const App: React.ComponentType<StyledProps> = withTheme()(InternalApp);
