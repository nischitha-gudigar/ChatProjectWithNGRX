import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { MyAppState } from '../app.state';
import { ChatData } from '../chat-data';
import { ChatList } from '../chat-list.service';
import { addChat } from '../chat.action';
import { selectMsg } from '../chat.reducer';

@Component({
  selector: 'app-chat-display',
  templateUrl: './chat-display.component.html',
  styleUrls: ['./chat-display.component.css']
})
export class ChatDisplayComponent implements OnInit {
  messageForm: FormGroup;
  selectedChatData: ChatData;
  id: number;
  messageData = [];
  messageDataForDisplay;

  constructor(
    private fb: FormBuilder,
    private chatService: ChatList,
    private routeActivated: ActivatedRoute,
    private route: Router,
    private store: Store<MyAppState>
  ) {}

  ngOnInit() {
    this.id = this.routeActivated.snapshot.params['id'];

    this.chatService.getParticularChatDetails(this.id).subscribe(res => {
      this.selectedChatData = res.find(item => item.id === this.id);
    });

    this.messageForm = this.fb.group({
      message: ['']
    });
  }

  saveMessage() {
    this.messageDataForDisplay = this.store.select(selectMsg);

    this.messageDataForDisplay.forEach(res => console.log(res));

    this.messageData = Object.assign([], this.messageData);
    this.messageData.push({
      chatId: this.id,
      chatParticular: [this.messageForm.value]
    });
    this.store.dispatch(addChat({ messageData: this.messageData }));
    this.messageForm.reset();
  }

  goBack() {
    this.route.navigate(['/contacts']);
  }
}
