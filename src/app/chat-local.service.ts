import { Injectable } from '@angular/core';
import { ChatData } from './chat-data';

@Injectable({ providedIn: 'root' })
export class ChatLocalStorage {
  /* get method for accessing private local storage*/
  private getLocal(key: number): string {
    return localStorage.getItem(String(key));
  }
  /* set method for setting local storage*/
  private setLocal(id: number, message: ChatData[]): void {
    localStorage.setItem(String(id), JSON.stringify(message));
  }
  getMessage(id: number): string {
    return this.getLocal(id);
  }
  setMessage(id: number, message: ChatData[]): void {
    this.setLocal(id, message);
  }
}
