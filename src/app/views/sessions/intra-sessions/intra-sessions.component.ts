import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IntraSession } from 'src/app/models/IntraSession';
import { AlertService } from 'src/app/services/alert.service';
import { IntraSessionService } from 'src/app/services/intra-session.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-intra-sessions',
  templateUrl: './intra-sessions.component.html',
  styleUrls: ['./intra-sessions.component.scss']
})
export class IntraSessionsComponent {
  allIntraSessions: IntraSession[] = [];
  isLoading!: boolean;

  constructor(
    private intraSessionService: IntraSessionService,
    private alert: AlertService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllIntraSessions();
  }

  getAllIntraSessions() {
    this.isLoading = true;
    this.intraSessionService.getAll().subscribe(
      (next) => {
        this.allIntraSessions = next;
        this.isLoading = false;
      },
      (err) => {
        this.alert.alertError(
          err.error !== null
            ? err.error.message
            : 'Impossible de récupérer les intrasessions'
        );
      }
    );
  }

  deleteIntraSessoin(id: number) {
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
        this.intraSessionService.delete(id).subscribe(
          () => {
            this.getAllIntraSessions();
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
    this.router.navigate(['dashboard/sessions/update/', id]);
  }
}
