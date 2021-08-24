import { createReducer, on } from '@ngrx/store';
import { Action } from '@ngrx/store';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { chatActionState, MyAppState } from './app.state';
import { addChat } from './chat.action';

export const initialState: chatActionState[] = [];

const _chatReducer = createReducer(
  initialState,
  on(addChat, (state: chatActionState[], message) => {
    if (state.length > 1) {
      // let result = state.filter(
      //   o1 => !message.messageData.some(o2 => o1.chatId === o2.chatId)
      // );
      // console.log('in ssssssssssssss');
      // console.log(result);
    }
    return {
      ...state,
      ...message.messageData
    };
  })
);

export function chatReducer(state: chatActionState[], action: Action) {
  return _chatReducer(state, action);
}
