import { Component, OnInit } from '@angular/core';
import { ChatData } from '../chat-data';
import { ChatList } from '../chat-list.service';
import { ChatLocalStorage } from '../chat-local.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {
  chatListData: ChatData[];
  constructor(
    private chatService: ChatList,
    private chatLocal: ChatLocalStorage
  ) {}

  ngOnInit() {
    this.chatService.getChatList().subscribe(resultData => {
      this.chatListData = resultData.map(
        res =>
          ({
            ...res,
            message: JSON.parse(this.chatLocal.getMessage(res.id))
          } as ChatData)
      );
    });
  }
}
