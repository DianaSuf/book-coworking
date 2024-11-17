import {createAction} from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../const';

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');
