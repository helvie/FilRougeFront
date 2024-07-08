import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InterSession } from 'src/app/models/InterSession';
import { AlertService } from 'src/app/services/alert.service';
import { InterSessionService } from 'src/app/services/inter-session.service';
import Swal from 'sweetalert2';
import { formatDate } from '../sessions.utils';

@Component({
  selector: 'app-inter-sessions',
  templateUrl: './inter-sessions.component.html',
  styleUrls: ['./inter-sessions.component.scss'],
})
export class InterSessionsComponent implements OnInit {
  allInterSessions: InterSession[] = [];
  isLoading!: boolean;

  showSubscriptions: number = 0;

  toggleSubscriptions(id:number) {
    this.showSubscriptions = this.showSubscriptions==id ? 0 : id;
  }
  
  constructor(
    private interSessionService: InterSessionService,
    private alert: AlertService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllInterSessions();
  }

  getAllInterSessions() {
    this.isLoading = true;
    this.interSessionService.getAll().subscribe(
      (next) => {
        this.allInterSessions = next;
        console.log('InterSessions:', this.allInterSessions);
        this.isLoading = false;
      },
      (err) => {
        this.alert.alertError(
          err.error !== null
            ? err.error.message
            : 'Impossible de récupérer les intersessions'
        );
      }
    );
  }

  deleteInterSessoin(id: number) {
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
    }).then((result) => {
      if (result.isConfirmed) {
        this.interSessionService.delete(id).subscribe(
          () => {
            this.getAllInterSessions();
            Swal.fire(
              'Supprimé!',
              'La session a été supprimée avec succès.',
              'success'
            );
          },
          (err) => {
            this.alert.alertError(
              err.error !== null
                ? err.error.message
                : 'Impossible de supprimer la session'
            );
          }
        );
      }
    });
  }

  goToUpdate(id: number) {
    this.router.navigate(['dashboard/intersessions/update/', id]);
  }
}
