import { Component } from '@angular/core';
import {
  InterSession,
  EmptyInterSession,
  InterSessionWithSubscriptions,
  EmptyInterSessionWithSubscriptions,
} from 'src/app/models/InterSession';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  InterSessionService,
  InterSessionServiceWithSubscriptions,
} from 'src/app/services/inter-session.service';
import { AlertService } from 'src/app/services/alert.service';
import { tap } from 'rxjs';
import { Status, formatDate } from '../../sessions.utils';
import { Training } from 'src/app/models/Training';
import { Trainer } from 'src/app/models/Trainer';
import { TrainingService } from 'src/app/services/training.service';
import { TrainerService } from 'src/app/services/trainer.service';
@Component({
  selector: 'app-edit-inter-sesssion',
  templateUrl: './edit-inter-sesssion.component.html',
  styleUrls: ['./edit-inter-sesssion.component.scss'],
})
export class EditInterSesssionComponent {
  id!: number;
  interSessionDetail: InterSession = EmptyInterSession;
  interSessionDetailWithSubscriptions: InterSessionWithSubscriptions =
    EmptyInterSessionWithSubscriptions;

  statusValues: String[] = Object.values(Status);
  allTrainings: Training[] = [];
  allTrainers: Trainer[] = [];
  isFormSessionLoading!: boolean;
  interSessionFormUpdate: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private interSessionService: InterSessionService,
    // private interSessionServiceWithSubscriptions: InterSessionServiceWithSubscriptions,
    private trainingService: TrainingService,
    private trainerService: TrainerService,
    private alert: AlertService,
    private toastService: AlertService,
    private router: Router
  ) {
    this.interSessionFormUpdate = this.formBuilder.group({
      id: ['', Validators.required],
      code: ['', Validators.required],
      duration: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      status: [this.statusValues],
      date: ['', Validators.required],
      location: ['', Validators.required],
      minParticipants: new FormControl(''),
      sessionScore: ['', Validators.required],
      training: ['', Validators.required],
      trainer: ['', Validators.required],
      particularSubscription: [''],
      particularSubscriptions: [''],
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.handlerGetInterSessionById();
    this.getAllTrainings();
    this.getAllTrainers();
    this.initForm();
  }

  initForm() {
    this.interSessionFormUpdate.patchValue({
      code: this.interSessionDetailWithSubscriptions.code,
      id: this.interSessionDetailWithSubscriptions.id,
      duration: this.interSessionDetailWithSubscriptions.duration,
      price: this.interSessionDetailWithSubscriptions.price,
      minParticipants: this.interSessionDetailWithSubscriptions.minParticipants,
      status: this.interSessionDetailWithSubscriptions.status,
      date: formatDate(this.interSessionDetailWithSubscriptions.date),
      location: this.interSessionDetailWithSubscriptions.location,
      sessionScore: this.interSessionDetailWithSubscriptions.sessionScore,
      description: this.interSessionDetailWithSubscriptions.description,
      training: this.interSessionDetailWithSubscriptions.training?.id,
      trainer: this.interSessionDetailWithSubscriptions.trainer?.id,
      particularSubscriprion:
        this.interSessionDetailWithSubscriptions.particularSubscription,
      particularSubscriptions: [
        this.interSessionDetailWithSubscriptions.particularSubscriptions,
      ],
    });
  }

  getAllTrainings() {
    this.isFormSessionLoading = true;
    this.trainingService.getAll().subscribe(
      (next) => {
        this.allTrainings = next;
        this.isFormSessionLoading = false;
      },
      (err) => {
        this.alert.alertError(
          err.error !== null
            ? err.error.message
            : 'Impossible de récupérer les formations'
        );
      }
    );
  }

  getAllTrainers() {
    this.isFormSessionLoading = true;
    this.trainerService.getAll().subscribe(
      (next) => {
        this.allTrainers = next;
        this.isFormSessionLoading = false;
      },
      (err) => {
        this.alert.alertError(
          err.error !== null
            ? err.error.message
            : 'Impossible de récupérer les formateurs'
        );
      }
    );
  }

  handlerGetInterSessionById() {
    console.log(this.interSessionDetail)
   
    this.interSessionService.getById(this.id).subscribe(
      (data) => {
        this.interSessionDetail = data as InterSessionWithSubscriptions;
        this.initForm();
      },
      (err) => {
        this.alert.alertError(
          err.error !== null ? err.error.message : "une erreur s'est produite"
        );
      }
    );
  }

  isSelectedTraining(trainingId: number) {
    return this.allTrainings.some(
      (selectedTraining) => selectedTraining.id === trainingId
    );
  }

  isSelectedTrainer(trainerId: number) {
    return this.allTrainers.some(
      (selectedTrainer) => selectedTrainer.id === trainerId
    );
  }

  isSelectedStatus(status: String): boolean {
    return this.statusValues.some(
      (selectedStatus) => selectedStatus === status
    );
  }

  updateInterSession() {
    this.isFormSessionLoading = true;
    const interSessionId = this.id;

    const formValues = this.interSessionFormUpdate.value;
    let interSessionUpdate = {
      ...formValues,
      training: this.allTrainings.find(
        (t) => t.id === parseInt(formValues.training)
      ),
      trainer: this.allTrainers.find(
        (t) => t.id === parseInt(formValues.trainer)
      ),
    };

    this.interSessionService
      .edit(interSessionId, interSessionUpdate)
      .pipe(
        tap(
          (value) => {
            console.log(value);
            this.toastService.alertSuccess(
              'Modification effectuée avec succès!'
            );
            this.isFormSessionLoading = false;
            this.interSessionFormUpdate.reset();
            this.router.navigate(['dashboard/sessions']);
          },
          (error) => {
            console.log(error);
            if (error.error == null) {
              this.toastService.alertError(
                "Une erreur est survenue lors de l'enregistrement d'une session"
              );
              this.isFormSessionLoading = false;
            } else {
              this.toastService.alertError(error.error.message);
              this.isFormSessionLoading = false;
            }
          }
        )
      )
      .subscribe();
  }

  cancel() {
    this.router.navigate(['/dashboard/sessions']);
  }
}
