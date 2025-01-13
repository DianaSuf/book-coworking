import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IModalType } from '../../types/modal-data';

interface ModalState {
  currentModal: IModalType;
}

const initialState: ModalState = {
  currentModal: null,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  selectors: {
    getCurrentModal: (store) => store.currentModal,
  },
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

export const { getCurrentModal } = modalSlice.selectors;
