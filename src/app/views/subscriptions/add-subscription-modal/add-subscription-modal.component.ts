import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InterSession, InterSessionWithSubscriptions } from 'src/app/models/InterSession';
import { IntraSession, IntraSessionWithSubscriptions } from 'src/app/models/IntraSession';
import { SubscriptionService } from 'src/app/services/subscription.service';
import { AlertService } from 'src/app/services/alert.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-subscription-modal',
  templateUrl: './add-subscription-modal.component.html',
  styleUrls: ['./add-subscription-modal.component.scss']
})
export class AddSubscriptionModalComponent {
  @Output() selectedTraining = new EventEmitter<string | null>();
  @Output() modalClosed = new EventEmitter<void>();
  @Output() sessionSelected = new EventEmitter<number>();
  
  @Input() intraSessions: IntraSession[] = [];
  @Input() intraSessionsWithSubscriptions: IntraSessionWithSubscriptions[] = [];
  @Input() interSessions: InterSession[] = [];
  @Input() interSessionsWithSubscriptions: InterSessionWithSubscriptions[] = [];
  @Input() isLoadingSessions: boolean = false;  
  @Input() isLoadingSubscription: boolean = false;
  @Input() sessionType: 'inter' | 'intra' = 'inter';
  @Input() personId!: number; 

  constructor(
    private subscriptionService: SubscriptionService,
    private alert: AlertService,
  ) {} 

  ngOnInit() {
    console.log("AddSubscriptionModalComponent has been initialized");
  }

  selectTraining(training: string) {
    this.selectedTraining.emit(training);
  }

  closeModal() {
    this.modalClosed.emit(); 
  }
  
  subscribeToSession(sessionId: number, personType: string) {
    this.isLoadingSubscription = true;
    if (personType === 'particular') {
      this.subscriptionService.subscribePersonToInterSession(this.personId, sessionId).subscribe(
        response => {
          this.isLoadingSubscription = false;
          console.log("Inscription réussie:", response);
          Swal.fire('Inscription réussie!', "Vous vous êtes inscrit à la session avec succès.", 'success').then(() => {
            this.closeModal(); 
          });
        },
        error => {
          this.isLoadingSubscription = false;
          console.error("Erreur lors de l'inscription:", error);
          this.alert.alertError(error.error !== null ? error.error.message : 'Une erreur s\'est produite lors de l\'inscription à la session');
        }
      );
    } else if (personType === 'employee') {
      this.subscriptionService.subscribePersonToIntraSession(this.personId, sessionId).subscribe(
        response => {
          this.isLoadingSubscription = false;
          console.log("Inscription réussie:", response);
          Swal.fire('Inscription réussie!', "Vous vous êtes inscrit à la session avec succès.", 'success').then(() => {
            this.closeModal();
          });
        },
        error => {
          this.isLoadingSubscription = false;
          console.error("Erreur lors de l'inscription:", error);
          this.alert.alertError(error.error !== null ? error.error.message : 'Une erreur s\'est produite lors de l\'inscription à la session');
        }
      );
    }
  }
}