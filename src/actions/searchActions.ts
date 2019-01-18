import { FETCH_ORGANIZATIONS, FETCH_CAUSES, UPDATE_SEARCH_TERMS } from './types';
import axios from 'axios';
// import { createAction } from '../utilities/action-helpers';

// tslint:disable-next-line:no-any
export const fetchOrganizations = (body: any) => (dispatch: any) => {
  axios
    .post('http://localhost:8000/api/externalApi', { data: body, token: sessionStorage.getItem('UserObj') })
    // tslint:disable-next-line:no-any
    .then((res: { data: any; }) => dispatch({
      type: FETCH_ORGANIZATIONS,
      payload: res.data
    }));
};

// redux1: cut the api call function from home.tsx, added it here, and exported it
// I don't really understand the dispatch, it comes from thunk and is middleware
// tslint:disable-next-line:no-any
export const fetchCauses = (test: string) => (dispatch: any) => {
  return new Promise((resolve, reject) => {
    axios.get('http://localhost:8000/api/causes')
    // tslint:disable-next-line:no-any
    .then((causes: any) => dispatch({
      type: FETCH_CAUSES,
      payload: causes.data
    }));
  });
};

// tslint:disable-next-line:no-any
export const updateSearchTerms = (terms: string) => (dispatch: any) => {
  dispatch({
    type: UPDATE_SEARCH_TERMS, 
    payload: terms
  });
};