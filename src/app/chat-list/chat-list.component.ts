import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store/src';
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
  constructor(
    private chatService: ChatList,
    private store: Store<chatActionState[]>
  ) {}

  ngOnInit() {
    this.chatService.getChatList().subscribe(resultData => {
      this.chatListDataForDisplay = resultData.map(res => res);
    });
    setTimeout(() => {
      this.chatListDataForDisplay.forEach(res =>
        this.messageData.push({
          chatId: res.id,
          chatParticular: [res.content]
        })
      );
      console.log('inside set time');
      console.log(this.messageData);
      // this.store.dispatch(addChat({this.messageData}));
    }, 1000);
  }
}
