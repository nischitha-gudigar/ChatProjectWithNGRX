import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable } from 'rxjs';

export interface chatActionState {
  chatId: number;
  chatParticular: string[];
}

export interface MyAppState {
  messages: chatActionState[];
}

@Injectable()
export class ChatStore extends ComponentStore<MyAppState> {
  constructor() {
    super({ messages: [] });
  }
  readonly messages$: Observable<chatActionState[]> = this.select(
    state => state.messages
  );
}
