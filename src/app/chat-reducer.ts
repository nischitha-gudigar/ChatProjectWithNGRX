import { createReducer, on, Action } from '@ngrx/store';
import { chatActionState } from './app.state';
import { addChat } from './chat.action';

export const initialState: chatActionState = {
  chats: []
};

const _chatReducer = createReducer(
  initialState,
  on(addChat, (state, { chatData }) => [...chatData])
);

export function chatReducer(state, action) {
  return _chatReducer(state, action);
}
