import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IntraSession, IntraSessionWithSubscriptions } from 'src/app/models/IntraSession';
import { AlertService } from 'src/app/services/alert.service';
import { IntraSessionService, IntraSessionServiceWithSubscriptions } from 'src/app/services/intra-session.service';
import Swal from 'sweetalert2';
import { formatDate } from '../sessions.utils';

@Component({
  selector: 'app-intra-sessions',
  templateUrl: './intra-sessions.component.html',
  styleUrls: ['./intra-sessions.component.scss']
})
export class IntraSessionsComponent {
  // allIntraSessions: IntraSession[] = [];
  allIntraSessionsWithSubscriptions: IntraSessionWithSubscriptions[] = [];
  isLoading!: boolean;
  showSubscriptions: number = 0;

  toggleSubscriptions(id:number) {
    this.showSubscriptions = this.showSubscriptions==id ? 0 : id;
  }
  constructor(
    private intraSessionService: IntraSessionService,
    private intraSessionServiceWithSubscriptions: IntraSessionServiceWithSubscriptions,
    private alert: AlertService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.getAllIntraSessions();
    this.getAllIntraSessionsWithSubscriptions();
  }

  // getAllIntraSessions() {
  //   this.isLoading = true;
  //   this.intraSessionService.getAll().subscribe(
  //     (next) => {
  //       this.allIntraSessions = next;
  //       console.log('IntraSessions:', this.allIntraSessions);

  //       this.isLoading = false;
  //     },
  //     (err) => {
  //       this.alert.alertError(
  //         err.error !== null
  //           ? err.error.message
  //           : 'Impossible de récupérer les intrasessions'
  //       );
  //     }
  //   );
  // }

  getAllIntraSessionsWithSubscriptions() {
    this.isLoading = true;
    this.intraSessionServiceWithSubscriptions.getAll().subscribe(
      (next) => {
        this.allIntraSessionsWithSubscriptions = next;
        console.log('IntraSessions:', this.allIntraSessionsWithSubscriptions);

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
            // this.getAllIntraSessions();
            this.getAllIntraSessionsWithSubscriptions();
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
    this.router.navigate(['dashboard/intrasessions/update/', id]);
  }
}
