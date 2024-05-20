import { createSlice } from '@reduxjs/toolkit';

interface IState {
  showModal: boolean;
  formType: 'board' | 'card';
}
const initialState: IState = {
  showModal: false,
  formType: null,
};

const slice = createSlice({
  name: 'modalSlice',
  initialState,
  reducers: {
    setShowModal: (state, action) => {
      state.showModal = true;
      state.formType = action.payload;
    },
    closeModal: (state) => {
      state.showModal = false;
      state.formType = null;
    },
  },
});
const { actions, reducer: modalReducer } = slice;
const modalActions = {
  ...actions,
};
export { modalActions, modalReducer };
