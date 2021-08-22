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
  chatListData: ChatData[];
  constructor(
    private chatService: ChatList,
    private store: Store<chatActionState>
  ) {}

  ngOnInit() {
    this.chatService.getChatList().subscribe(resultData => {
      this.chatListData = resultData.map(res => res);
    });
    this.store.dispatch(addChat(this.chatListData));
  }
}
