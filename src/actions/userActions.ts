import { 
  Actions,
} from './types';
import axios from 'axios';

export function userIsLoading(bool: boolean) {
  // tslint:disable-next-line:no-console
  console.log('im loading', bool);
  return {
      type: 'USER_IS_LOADING',
      isLoading: bool
  };
}

// tslint:disable-next-line:no-any
export const fetchUserSuccess = (user: any) => (dispatch: any) => {
  // tslint:disable-next-line:no-console
  console.log('success');
  dispatch({
        type: Actions.FETCH_USER_SUCCESS,
        payload: user
    });
};

// tslint:disable-next-line:no-any
export const fetchUser = () => (dispatch: any) => {
  dispatch(userIsLoading(true));

  let id = localStorage.getItem('UserObj') ? localStorage.getItem('UserObj') : sessionStorage.getItem('UserObj');
  axios.get(`http://localhost:8000/api/account/${id}`)
  // tslint:disable-next-line:no-any
  .then((res: { data: any; statusText: string; }) => {
    if (res.statusText !== 'OK') {
      throw Error(res.statusText);
    }

    dispatch(userIsLoading(false));

    return res;

  })
  // tslint:disable-next-line:no-any
  .then((res: { data: any; statusText: string; }) => dispatch(fetchUserSuccess(res.data)));

};