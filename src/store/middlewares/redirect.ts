import { PayloadAction } from '@reduxjs/toolkit';
import browserHistory from '../../browser-history';
import { Middleware } from 'redux';
import { rootReducer } from '../root-reducer';

type Reducer = ReturnType<typeof rootReducer>;

export const redirect: Middleware<unknown, Reducer> =
  () =>
    (next) =>
      (action): unknown => {
        if (isPayloadActionWithString(action)) {
          if (action.type === 'game/redirectToRoute') {
            browserHistory.push(action.payload);
          }
        }
        return next(action);
      };

// Тип-гард для проверки структуры action
function isPayloadActionWithString(action: unknown): action is PayloadAction<string> {
  return (
    typeof action === 'object' &&
    action !== null &&
    'type' in action &&
    'payload' in action &&
    typeof (action as { type: unknown }).type === 'string' &&
    typeof (action as { payload: unknown }).payload === 'string'
  );
}
