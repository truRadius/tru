import { 
  Actions
} from './types';
import axios from 'axios';

// tslint:disable-next-line:no-any
export const fetchOrganizations = (body: any) => (dispatch: any) => {
  axios
    .post('http://localhost:8000/api/externalApi', { data: body, token: sessionStorage.getItem('UserObj') })
    // tslint:disable-next-line:no-any
    .then((res: { data: any; statusText: string; }) => {
      dispatch({
        type: Actions.FETCH_ORGANIZATIONS,
        payload: res.data
      });
      if (res.statusText === 'OK') {
        dispatch(fetchUser());
      }});
};

// redux1: cut the api call function from home.tsx, added it here, and exported it
// I don't really understand the dispatch, it comes from thunk and is middleware
// tslint:disable-next-line:no-any
export const fetchCauses = () => (dispatch: any) => {
  axios.get('http://localhost:8000/api/causes')
  // tslint:disable-next-line:no-any
  .then((causes: any) => dispatch({
    type: Actions.FETCH_CAUSES,
    payload: causes.data
  }));
};

// tslint:disable-next-line:no-any
export const updateSearchTerms = (terms: string) => (dispatch: any) => {
  dispatch({
    type: Actions.UPDATE_SEARCH_TERMS, 
    payload: terms
  });
};

// tslint:disable-next-line:no-any
export const updateSearchRadius = (radius: number) => (dispatch: any) => {
  dispatch({
    type: Actions.UPDATE_SEARCH_RADIUS, 
    payload: radius
  });
};

// tslint:disable-next-line:no-any
export const updateSearchCauses = (causes: Array<string>) => (dispatch: any) => {
  dispatch({
    type: Actions.UPDATE_SEARCH_CAUSES, 
    payload: causes
  });
};

export function userIsLoading(bool: boolean) {
  return {
      type: 'USER_IS_LOADING',
      isLoading: bool
  };
}

// tslint:disable-next-line:no-any
export const fetchUserSuccess = (user: any) => (dispatch: any) => {
  dispatch({
    type: Actions.FETCH_USER_SUCCESS,
    payload: user
  });
  dispatch(fetchCauses());
};

// tslint:disable-next-line:no-any
export const fetchUser = () => (dispatch: any) => {
  dispatch(userIsLoading(true));

  let id = localStorage.getItem('UserObj') ? localStorage.getItem('UserObj') : sessionStorage.getItem('UserObj');
  axios.get(`http://localhost:8000/api/account/${id}`)
  // tslint:disable-next-line:no-any
  .then((res: { data: any; statusText: string; }) => dispatch(fetchUserSuccess(res.data)));

};