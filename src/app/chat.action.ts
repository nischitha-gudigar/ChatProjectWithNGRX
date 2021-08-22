import { createAction, props } from '@ngrx/store';
import { ChatData } from './chat-data';

export const addChat = createAction(
  '[Chat List Component] AddChat',
  props<{ chatData: ChatData[] }>()
);
