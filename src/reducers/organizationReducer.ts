import { FETCH_ORGANIZATIONS } from 'src/actions/types';

const initialState = {
  items: []
};

// tslint:disable-next-line:no-any
export default function(state: any = initialState, action: any) {
  switch (action.type) {
    case FETCH_ORGANIZATIONS:
      // tslint:disable-next-line:no-console
      console.log('reducer', action.payload);
      return {
        ...state,
        items: action.payload
      };
    default:
      return state;

  }
}