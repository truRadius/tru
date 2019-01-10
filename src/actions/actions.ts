import { ActionsUnion } from 'src/utilities/types';
import { createAction } from 'src/utilities/action-helpers';

export enum ActionTypes {
  FETCH_ORGANIZATIONS = 'FETCH_ORGANIZATIONS',
}

export const Actions = {
  // tslint:disable-next-line:no-any
  fetchOrganizations: (request: any) => (
    createAction(ActionTypes.FETCH_ORGANIZATIONS, request)
  ),
};

export type Actions = ActionsUnion<typeof Actions>;