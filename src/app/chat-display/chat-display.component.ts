import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { ChatData } from '../chat-data';
import { ChatList } from '../chat-list.service';
import { ChatLocalStorage } from '../chat-local.service';

@Component({
  selector: 'app-chat-display',
  templateUrl: './chat-display.component.html',
  styleUrls: ['./chat-display.component.css']
})
export class ChatDisplayComponent implements OnInit {
  // For displaying chat contact info
  selectedChatData: ChatData;
  messageForm: FormGroup;
  // For display messages from localstorage
  messageForDisplay: Observable<ChatData[]>;
  // For storing messages into observable
  chat$: BehaviorSubject<ChatData[]> = new BehaviorSubject([]);
  id: number;

  constructor(
    private fb: FormBuilder,
    private chatService: ChatList,
    private routeActivated: ActivatedRoute,
    private route: Router,
    private chatLocal: ChatLocalStorage
  ) {}

  ngOnInit() {
    this.id = this.routeActivated.snapshot.params['id'];

    this.chatService.getParticularChatDetails(this.id).subscribe(res => {
      this.selectedChatData = res.find(item => item.id === this.id);
    });

    this.messageForm = this.fb.group({
      message: ['']
    });

    if (this.chatLocal.getMessage(this.id)) {
      this.messageForDisplay = JSON.parse(this.chatLocal.getMessage(this.id));
      this.chat$.next(JSON.parse(this.chatLocal.getMessage(this.id)));
    }
  }

  saveMessage() {
    this.chat$.next([...this.chat$.getValue(), this.messageForm.value.message]);
    this.chatLocal.setMessage(this.selectedChatData.id, this.chat$.value);
    this.messageForDisplay = JSON.parse(
      this.chatLocal.getMessage(this.selectedChatData.id)
    );
    this.messageForm.reset();
  }

  goBack() {
    this.route.navigate(['/contacts']);
  }
}
