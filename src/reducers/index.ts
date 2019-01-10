import { combineReducers } from 'redux';
import organizations, { fromOrgs } from './organizationReducer';
import { AppState } from 'src/modules/types';

export class ApplicationState {
  // tslint:disable-next-line:no-any
  organizations: any;
}

export default combineReducers({
  organizations
});

export const selectors = {
  fetchOrganizations: (state: AppState) => fromOrgs.getFetchedOrganizations(state.appState.organizations),
};