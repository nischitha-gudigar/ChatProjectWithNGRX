import { createReducer, on } from '@ngrx/store';
import { Action } from '@ngrx/store';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { chatActionState, MyAppState } from './app.state';
import { addChat } from './chat.action';

export const initialState: chatActionState[] = [
  {
    chatId: null,
    chatParticular: []
  }
];

const _chatReducer = createReducer(
  initialState,
  on(addChat, (state: chatActionState[], message) => {
    return {
      ...state,
      ...message.messageData
    };
  })
);

export function chatReducer(state: chatActionState[], action: Action) {
  return _chatReducer(state, action);
}

const getMessage = createFeatureSelector<MyAppState>('messages');

export const selectMsg = createSelector(
  getMessage,
  state => state.messages
);
