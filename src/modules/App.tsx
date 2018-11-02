/* tslint:disable */ //toavoid unnecessary semicolon errors

import * as React from 'react';
import { StyledComponentProps, withTheme } from '@material-ui/core';
import Main from './layout/Main';
import { NavBar } from './layout/NavBar';
import { Footer } from './layout/Footer';

interface StateProps {}
interface DispatchProps {}
interface InternalState {}
class InternalApp extends React.PureComponent<InternalState> {
  state = {
    // errStack: []
  };

  // errStack: Array<string> = [];
  // validateEmail = (email: string) => {
  //   let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //   let emailErr = 'Invalid Email';
  //   let index = this.errStack.indexOf(emailErr);
  //   if (reg.test(email) === false) {
  //     if (index === -1) {
  //       this.errStack.push(emailErr);
  //       this.setState({ errStack: this.errStack });
  //     }
  //   } else {
  //     this.setState({ errStack: index >= 0 ? this.errStack.splice(index, 1) : this.errStack });
  //   }
  // };

  // confirmPassword = (password: string, passCheck: string) => {
  //   let passErr = 'Password does not match';
  //   let index = this.errStack.indexOf(passErr);
  //   if (password !== passCheck) {
  //     if (index === -1) {
  //       this.errStack.push(passErr);
  //       this.setState({ errStack: this.errStack });
  //     }
  //   } else {
  //     this.errStack = index >= 0 ? this.errStack.splice(index, 1) : this.errStack;
  //     this.setState({ errStack: this.errStack });
  //   }
  // };

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
export const App: React.ComponentType<StyledProps> = withTheme()(InternalApp);
