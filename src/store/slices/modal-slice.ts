import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IModalType } from '../../types/modal-data';

interface ModalState {
  currentModal: IModalType | null;
  reservationData: {
    date: string;
    timeStart: string;
    timeEnd: string;
  } | null;
  reservationId: number;
}

const initialState: ModalState = {
  currentModal: null,
  reservationData: null,
  reservationId: 0,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  selectors: {
    getCurrentModal: (store) => store.currentModal,
    getReservationData: (store) => store.reservationData,
    getReservationId: (store) => store.reservationId,
  },
  reducers: {
    openModal: (state, action: PayloadAction<IModalType>) => {
      state.currentModal = action.payload;
    },
    closeModal: (state) => {
      state.currentModal = null;
      state.reservationData = null;
    },
    setReservationData(state, action: PayloadAction<ModalState['reservationData']>) {
      state.reservationData = action.payload;
    },
    setReservationId(state, action: PayloadAction<number>) {
      state.reservationId = action.payload;
    },
  },
});

export const { openModal, closeModal, setReservationData, setReservationId } = modalSlice.actions;

export const { getCurrentModal, getReservationData, getReservationId } = modalSlice.selectors;
