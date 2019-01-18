import { 
  FETCH_ORGANIZATIONS, 
  FETCH_CAUSES, 
  UPDATE_SEARCH_TERMS,
  UPDATE_SEARCH_RADIUS,
  UPDATE_SEARCH_CAUSES,
} from 'src/actions/types';

const initialState = {
  organizations: [],
  causes: [],
  body: {
    search_terms: '',
    from: 0,
    size: 25,
    sort: {
      sort_by: '',
      ascending: true
    },
    filters: {
      geography: {
        zip: '',
        radius: 10
      },
      organization: {
        ntee_major_codes: []
      }
    }
  },
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
    case UPDATE_SEARCH_TERMS:
      return {
        ...state,
        body: {
          ...state.body,
          search_terms: action.payload
        }
      };
    case UPDATE_SEARCH_RADIUS:
      return {
        ...state,
        body: {
          ...state.body,
          filters: {
            ...state.body.filters,
            geography: {
              ...state.body.filters.geography,
              radius: action.payload
            }
          }
        }
      };
    case UPDATE_SEARCH_CAUSES:
      return {
        ...state,
        body: {
          ...state.body,
          filters: {
            ...state.body.filters,
            organization: {
              ...state.body.filters.organization,
              ntee_major_codes: action.payload
            }
          }
        }
      };
    default:
      return state;
  }
}