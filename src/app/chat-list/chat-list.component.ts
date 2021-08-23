import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { chatActionState } from '../app.state';
import { ChatData } from '../chat-data';
import { ChatList } from '../chat-list.service';
import { addChat } from '../chat.action';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {
  chatListDataForDisplay: ChatData[];
  messageData: chatActionState[];
  constructor(private chatService: ChatList, private store: Store) {}

  ngOnInit() {
    console.log('I am in chat list');
    this.messageData = Object.assign([], this.messageData);
    this.chatService.getChatList().subscribe(resultData => {
      this.chatListDataForDisplay = resultData.map(res => {
        this.messageData.push({
          chatId: res.id,
          chatParticular: [res.content]
        });
        return res;
      });
    });
    console.log(this.messageData);
    this.store.dispatch(addChat({ messageData: this.messageData }));
  }
}
