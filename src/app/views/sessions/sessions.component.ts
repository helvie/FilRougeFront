import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { Session } from 'src/app/models/Session';
import { AlertService } from 'src/app/services/alert.service';
import { SessionService } from 'src/app/services/session.service';
import Swal from 'sweetalert2';
import { Status } from './sessions.utils';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.scss']
})
export class SessionsComponent implements OnInit {
  allSessions: Session[] = [];
  
  sessionValue!: Session;
  sessionForm!:FormGroup;

  isShowSessions : boolean = false
  isShowInterSessions : boolean = false
  isShowIntraSessions : boolean = false

  isLoading!: boolean;
  isFormSessionLoading!: boolean;
  
  statusValues = Status;
  
  constructor(
    private sessionService: SessionService,
    private alert: AlertService,
    private router: Router,
    private toastService: AlertService
  ){

  }

  ngOnInit(): void {
    this.getAllSessions();
    this.initForm();
  }

  getAllSessions() {
    this.isLoading = true;
    this.sessionService.getAll()
      .subscribe(
        next => {
          this.allSessions = next;
          this.isLoading = false;
        },
        (err) => {
          this.alert.alertError(err.error !== null ? err.error.message : 'Impossible de récupérer les formations');
        }
      )
  }

  initForm() {
    this.sessionForm = new FormGroup({
      code: new FormControl(''),
      duration: new FormControl(''),
      price: new FormControl(''),
      description: new FormControl(''),
      status: new FormControl(''),
      date: new FormControl(''),
      location: new FormControl(''),
      sessionScore: new FormControl('')
     });
  }

  showSessions() {
    this.isShowSessions = true;
    this.isShowInterSessions = false;
    this.isShowIntraSessions = false;
   }

  showInterSessions(){
    this.isShowSessions = false;
    this.isShowInterSessions = true;
    this.isShowIntraSessions = false;
  }

  showIntraSessions(){
    this.isShowSessions = false;
    this.isShowInterSessions = false;
    this.isShowIntraSessions = true;
  }

  goToUpdate(id: number) {
    this.router.navigate(['dashboard/sessions/update/', id]);
  }

  deleteSessoin(id: number){
    Swal.fire({
      title: 'Etes-vous sûr de vouloir effectuer cette suppression?',
      text: 'Cette action est irréversible!',
      icon: 'warning',
      cancelButtonText: 'Annuler',
      showCancelButton: true,
      confirmButtonColor: '#0d6efd',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, Supprimer!',
      allowOutsideClick: false,
    }).then((result)=>{
      if (result.isConfirmed) {
        this.sessionService.delete(id).subscribe(() => {
            this.getAllSessions();
            Swal.fire(
              'Supprimé!',
              'La session a été supprimée avec succès.',
              'success'
            );
          },
          (err) => {
            this.alert.alertError(err.error !== null ? err.error.message : 'Impossible de supprimer la session');
          });
      }
    })
  }

  saveSession() {
    this.isFormSessionLoading = true;
    let sessionSave = this.createSession();
    this.sessionService.save(sessionSave).pipe(
      tap(
        (value) => {
          let sessionResponse = value;
          this.toastService.alertSuccess("Enregistrement effectué avec succès!");
          this.isFormSessionLoading = false;
          this.sessionForm.reset();
          setTimeout(() => {
            this.sessionForm.reset();
            window.location.reload();
          }, 1000);
        },
        (error) => {
          console.log(error);
          if (error.error == null) {
            this.toastService.alertError("Une erreur est survenue lors de l'enregistrement d'une session");
            this.isFormSessionLoading = false;
          } else {
            this.toastService.alertError(error.error.message);
            this.isFormSessionLoading = false;
          }
        }
      )
    ).subscribe();


  }

  createSession(): Session {
    this.sessionValue = this.sessionForm.value;
    return this.sessionValue;
  }
}
