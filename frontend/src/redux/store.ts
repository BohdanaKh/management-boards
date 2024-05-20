import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { boardReducer } from './slices/board.slice.ts';
import { cardReducer } from './slices/card.slice.ts';
import { modalReducer } from './slices/modal.slice.ts';

const rootReducer = combineReducers({
  boardReducer,
  cardReducer,
  modalReducer,
});

const setupStore = () =>
  configureStore({
    reducer: rootReducer,
  });

type RootState = ReturnType<typeof rootReducer>;
type AppStore = ReturnType<typeof setupStore>;
type AppDispatch = AppStore['dispatch'];

export type { RootState, AppStore, AppDispatch };

export { setupStore };
