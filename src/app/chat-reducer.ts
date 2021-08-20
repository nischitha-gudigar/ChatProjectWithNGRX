import { createReducer, on } from '@ngrx/store';
import { setMessage } from './counter.actions';
export const initialSMsg = 'Hello World';

const _chatReducer = createReducer(
  initialSMsg,
  on(setMessage, (state, payload) => {
    return state;
  })
);

export function chatReducer(state, action) {
  return _chatReducer(state, action);
}

/*
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://github.com/ngrx/platform
*/
