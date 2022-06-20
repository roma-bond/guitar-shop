import { GuitarWithReviews } from './guitars';
import store from '../store/store';

export interface State {
  guitars: GuitarWithReviews[],
  guitar: GuitarWithReviews | null
}

export type ServerState = {
  status: number | null;
};

export enum ActionType {
  LoadGuitars = 'data/loadGuitars',
  LoadGuitar = 'data/loadGuitar',
  UpdateGuitarReviews = 'data/updateGuitarReviews',
  UpdateServerStatus = 'server/updateServerStatus',
}

export type AppDispatch = typeof store.dispatch;
