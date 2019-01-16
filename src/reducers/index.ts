import { combineReducers } from 'redux';
import searchReducer from './searchReducer';

export class SearchState {
  // redux4: this prop somehow gets the state from searchReducer below
  // tslint:disable-next-line:no-any
  searchReducer: any;
}

const reducer = combineReducers({
  searchReducer
});

export default reducer;