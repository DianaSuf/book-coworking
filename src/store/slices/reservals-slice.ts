import { createSlice } from "@reduxjs/toolkit";
import { fetchReservalsAction } from "../api-actions";
import { IReserval } from "../../types/reservals-data";

interface ReservalsState {
  todayReserval: IReserval[];
  last7DaysReserval: IReserval[];
  lastMonthReserval: IReserval[];
  oldReserval: IReserval[];
  loading: boolean;
  error: string | null | undefined;
}

const initialState: ReservalsState  = {
  todayReserval: [],
  last7DaysReserval: [],
  lastMonthReserval: [],
  oldReserval: [],
  loading: false,
  error: null,
};

export const reservalsSlice = createSlice({
  name: 'reservals',
  initialState,
  reducers: {},
  selectors: {
    getReservalsToday: (store) => store.todayReserval,
    getReservalsWeek: (store) => store.last7DaysReserval,
    getReservalsMonth: (store) => store.lastMonthReserval,
    getOldReservals: (store) => store.oldReserval,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReservalsAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchReservalsAction.fulfilled, (state, action) => {
        if (action.payload) {
          state.todayReserval = action.payload.todayReserval;
          state.last7DaysReserval = action.payload.last7DaysReserval;
          state.lastMonthReserval = action.payload.lastMonthReserval;
          state.oldReserval = action.payload.oldReserval;
        }
        state.loading = false;
      })
      .addCase(fetchReservalsAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { getReservalsToday, getReservalsWeek, getReservalsMonth, getOldReservals } = reservalsSlice.selectors;

