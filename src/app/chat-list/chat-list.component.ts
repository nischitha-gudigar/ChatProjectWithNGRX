import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { chatActionState, ChatStore, MyAppState } from '../app.state';
import { ChatData } from '../chat-data';
import { ChatList } from '../chat-list.service';
import { addChat } from '../chat.action';
import { selectMsg } from '../chat.reducer';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {
  chatListDataForDisplay: ChatData[];
  messageData = [];
  messageDataForDisplay;
  chatArray$;
  constructor(
    private chatService: ChatList,
    private store: Store<MyAppState>,
    private readonly myStore: ChatStore
  ) {}

  ngOnInit() {
    console.log('I am in chat list');
    this.chatService.getChatList().subscribe(resultData => {
      this.chatListDataForDisplay = resultData.map(res => {
        let mData = {
          chatId: res.id,
          chatParticular: [res.content]
        };
        this.messageData = Object.assign([], this.messageData);
        this.messageData.push(mData);
        this.store.dispatch(addChat({ messageData: this.messageData }));
        return res;
      });
    });

    // this.messageDataForDisplay = this.store.select(selectMsg);
    // console.log(this.messageDataForDisplay);

    this.chatArray$ = this.myStore.messages$;
  }
}
