import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ModalType } from '../../const';

interface ModalState {
  currentModal: ModalType;
}

const initialState: ModalState = {
  currentModal: null,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<ModalType>) => {
      state.currentModal = action.payload;
    },
    closeModal: (state) => {
      state.currentModal = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
