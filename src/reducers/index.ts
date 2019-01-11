import { combineReducers } from 'redux';
import organizationReducer from './organizationReducer';

export default combineReducers({
  organizations: organizationReducer
});