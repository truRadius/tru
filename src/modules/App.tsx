import * as React from 'react';
import {
  StyledComponentProps,
  withTheme,
} from '@material-ui/core';
import Main from './layout/Main';
import { NavBar } from './layout/NavBar';
import { Footer } from './layout/Footer';

interface StateProps {
}
interface DispatchProps {
}
interface InternalState {
}
class InternalApp extends React.PureComponent<InternalState> {
  state = {
  };
  render() {

    return (
      <div>
        <nav>
          <NavBar />
        </nav>
        <main>
          <Main />
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    );
  }
}
type StyledProps = StateProps & DispatchProps & StyledComponentProps<string>;
export const App: React.ComponentType<StyledProps> =
  withTheme()(InternalApp);