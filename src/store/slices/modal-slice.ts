import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IModalType } from '../../types/modal-data';

interface ModalState {
  currentModal: IModalType | null;
  reservationData: {
    date: string;
    timeStart: string;
    timeEnd: string;
  } | null;
  notificationId: number;
}

const initialState: ModalState = {
  currentModal: null,
  reservationData: null,
  notificationId: 0,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  selectors: {
    getCurrentModal: (store) => store.currentModal,
    getReservationData: (store) => store.reservationData,
    getNotificationId: (store) => store.notificationId,
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
    setNotificationId(state, action: PayloadAction<number>) {
      state.notificationId = action.payload;
    },
  },
});

export const { openModal, closeModal, setReservationData, setNotificationId } = modalSlice.actions;

export const { getCurrentModal, getReservationData, getNotificationId } = modalSlice.selectors;
