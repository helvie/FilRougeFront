import { Component, OnInit } from '@angular/core';
import { Session } from 'src/app/models/Session';
import { AlertService } from 'src/app/services/alert.service';
import { SessionService } from 'src/app/services/session.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.scss']
})
export class SessionsComponent implements OnInit {
  allSessions: Session[] = [];
  isLoading!: boolean;

  constructor(
    private sessionService: SessionService,
    private alert: AlertService
  ){

  }

  ngOnInit(): void {
    this.getAllSessions();
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
}
