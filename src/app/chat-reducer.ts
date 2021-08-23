import { createReducer, on, Action } from '@ngrx/store';
import { chatActionState } from './app.state';
import { addChat } from './chat.action';

export const initialState: chatActionState[] = [];

const _chatReducer = createReducer(
  initialState,
  on(addChat, (state, { messageData }) => [...messageData])
);

export function chatReducer(state, action) {
  return _chatReducer(state, action);
}
