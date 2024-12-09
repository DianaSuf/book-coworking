import {createAction} from '@reduxjs/toolkit';
import { AuthorizationStatus, AppRoute } from '../const';

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');
export const redirectToRoute = createAction<AppRoute>('app/redirectToRoute');
