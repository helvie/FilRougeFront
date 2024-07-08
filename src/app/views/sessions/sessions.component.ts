import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.scss']
})
export class SessionsComponent {
  isShowInterSessions : boolean = true
  isShowIntraSessions : boolean = false

  isLoading!: boolean;
  isFormSessionLoading!: boolean;
  
  constructor(
    private router: Router,
  ){ }

  showSessions() {
    this.isShowInterSessions = false;
    this.isShowIntraSessions = false;
   }

  showInterSessions(){
    this.isShowInterSessions = true;
    this.isShowIntraSessions = false;
  }

  showIntraSessions(){
    this.isShowInterSessions = false;
    this.isShowIntraSessions = true;
  }

  goToUpdate(id: number) {
    this.router.navigate(['dashboard/sessions/update/', id]);
  }
}
