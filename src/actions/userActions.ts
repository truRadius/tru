import { 
  FETCH_USER,
} from './types';
import axios from 'axios';

// tslint:disable-next-line:no-any
export const fetchUser = (test: string) => (dispatch: any) => {
  let id = localStorage.UserObj ? localStorage.UserObj : sessionStorage.UserObj;
  // tslint:disable-next-line:no-console
  console.log('userActions', id);
  axios.get(`http://localhost:8000/api/account/${id}`)
  // tslint:disable-next-line:no-any
  .then((res: { data: any; }) => {
    // tslint:disable-next-line:no-console
    console.log('data', res.data);
    dispatch({
      type: FETCH_USER,
      payload: res.data
    });
  });
};