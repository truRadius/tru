import { FETCH_ORGANIZATIONS, FETCH_CAUSES } from 'src/actions/types';

const initialState = {
  organizations: [],
  causes: []
};

// tslint:disable-next-line:no-any
export default function(state: any = initialState, action: any) {
  switch (action.type) {
    case FETCH_ORGANIZATIONS:
      return {
        ...state,
        organizations: action.payload
      };
      // redux3: imported FETCH_CAUSES and added a case to listen for the dispatch in searchActions
      // action.payload is the payload that got dispatched in searchActions
    case FETCH_CAUSES:
      return {
        ...state,
        causes: action.payload
      };
    default:
      return state;
  }
}