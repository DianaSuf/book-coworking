import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IModalType } from '../../types/notification-data';

interface ModalState {
  currentModal: IModalType;
}

const initialState: ModalState = {
  currentModal: null,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<IModalType>) => {
      state.currentModal = action.payload;
    },
    closeModal: (state) => {
      state.currentModal = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
