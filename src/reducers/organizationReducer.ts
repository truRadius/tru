import { ActionTypes, Actions } from 'src/actions/actions';
import { combineReducers } from 'redux';

export class UIState {
  // tslint:disable-next-line:no-any
  fetchOrganizations: any;
}

const initialState: UIState = {
  fetchOrganizations: []
};

// tslint:disable-next-line:no-any
const fetchOrganizations = (state: any = initialState, action: Actions) => {
  switch (action.type) {
    case ActionTypes.FETCH_ORGANIZATIONS:
      // tslint:disable-next-line:no-console
      console.log('orgs', action.payload);
      return {
        ...state,
        items: action.payload
      };
    default:
      return state;

  }
};

const organizations = combineReducers({
  fetchOrganizations,
});

export default organizations;

export const fromOrgs = {
  getFetchedOrganizations: (state: UIState) => state.fetchOrganizations,
};