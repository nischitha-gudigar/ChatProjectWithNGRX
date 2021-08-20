import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ChatListComponent } from './chat-list/chat-list.component';
import { ChatDisplayComponent } from './chat-display/chat-display.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'contacts', component: ChatListComponent },
  { path: 'chat/:id', component: ChatDisplayComponent },
  { path: '', redirectTo: 'contacts', pathMatch: 'full' }
];

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [AppComponent, ChatListComponent, ChatDisplayComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
