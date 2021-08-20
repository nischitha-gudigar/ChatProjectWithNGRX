import { Component, OnInit } from '@angular/core';
import { ChatData } from '../chat-data';
import { ChatList } from '../chat-list.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {
  chatListData: ChatData[];
  constructor(private chatService: ChatList) {}

  ngOnInit() {
    this.chatService.getChatList().subscribe(resultData => {
      this.chatListData = resultData.map(res => res);
    });
  }
}
