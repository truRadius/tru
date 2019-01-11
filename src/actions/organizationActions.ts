import { FETCH_ORGANIZATIONS } from './types';
import axios from 'axios';

// tslint:disable-next-line:no-any
export const fetchOrganizations = (body: any) => (dispatch: any) => {
    // tslint:disable-next-line:no-console
    console.log('action');

    axios
      .post('http://localhost:8000/api/externalApi', { data: body, token: sessionStorage.getItem('UserObj') })
      // tslint:disable-next-line:no-any
      .then((res: { data: any; }) => dispatch({
        type: FETCH_ORGANIZATIONS,
        payload: res.data
      }));
};