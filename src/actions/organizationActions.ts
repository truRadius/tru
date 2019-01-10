// import { FETCH_ORGANIZATIONS } from './actions';
// import axios from 'axios';

// const body = {
//   search_terms: '',
//   from: 0,
//   size: 25,
//   sort: {
//     sort_by: '',
//     ascending: true
//   },
//   filters: {
//     geography: {
//       zip: '',
//       radius: 10
//     },
//     organization: {
//       ntee_major_codes: []
//     }
//   }
// };

// // tslint:disable-next-line:no-any
// export const fetchOrganizations = () => (dispatch: any) => {
//     // tslint:disable-next-line:no-console
//     console.log('BODY ======>', body);

//     axios
//       .post('http://localhost:8000/api/externalApi', { data: body, token: sessionStorage.getItem('UserObj') })
//       // tslint:disable-next-line:no-any
//       .then((res: { data: any; }) => dispatch({
//         type: FETCH_ORGANIZATIONS,
//         payload: res.data
//       }));
// };