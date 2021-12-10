import { createContext } from 'react';
import { initialState } from './reducer';
import { DestroyByRootIdFn, DestroyFn, HideFn, ShowFn, State, UpdateFn } from './types';

export type ModalContextState = {
  state: State;
  updateModal: UpdateFn;
  hideModal: HideFn;
  destroyModal: DestroyFn;
  destroyModalsByRootId: DestroyByRootIdFn;
  showModal: ShowFn;
};

export const initialContextState = {
  state: initialState,
  hideModal: () => {},
  showModal: () => ({
    id: 'id',
    hide: () => {},
    destroy: () => {},
    update: () => {},
  }),
  destroyModal: () => {},
  updateModal: () => {},
  destroyModalsByRootId: () => {},
};

const ModalContext = createContext<ModalContextState>(initialContextState);

export default ModalContext;
