import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { ChatData } from '../chat-data';
import { ChatList } from '../chat-list.service';

@Component({
  selector: 'app-chat-display',
  templateUrl: './chat-display.component.html',
  styleUrls: ['./chat-display.component.css']
})
export class ChatDisplayComponent implements OnInit {
  messageForm: FormGroup;
  selectedChatData: ChatData;
  id: number;

  constructor(
    private fb: FormBuilder,
    private chatService: ChatList,
    private routeActivated: ActivatedRoute,
    private route: Router
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
    console.log(this.messageForm.value.message);
    this.messageForm.reset();
  }

  goBack() {
    this.route.navigate(['/contacts']);
  }
}
