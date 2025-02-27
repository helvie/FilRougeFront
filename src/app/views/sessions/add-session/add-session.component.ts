import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { Session } from 'src/app/models/Session';
import { AlertService } from 'src/app/services/alert.service';
import { SessionService } from 'src/app/services/session.service';
import { Status } from '../sessions.utils';
import { InterSessionService } from 'src/app/services/inter-session.service';
import { IntraSessionService } from 'src/app/services/intra-session.service';
import { InterSession } from 'src/app/models/InterSession';
import { IntraSession } from 'src/app/models/IntraSession';
import { CompanyService } from 'src/app/services/company.service';
import { Company } from 'src/app/models/Company';
import { TrainingService } from 'src/app/services/training.service';
import { TrainerService } from 'src/app/services/trainer.service';
import { Training } from 'src/app/models/Training';
import { Trainer } from 'src/app/models/Trainer';

@Component({
  selector: 'app-add-session',
  templateUrl: './add-session.component.html',
  styleUrls: ['./add-session.component.scss'],
})
export class AddSessionComponent implements OnInit {
  isFormSessionLoading!: boolean;
  sessionForm!: FormGroup;
  interSessionValue!: InterSession;
  intraSessionValue!: IntraSession;

  statusValues: String[] = Object.values(Status);
  sessionTypes: String[] = ['IntraSession', 'InterSession'];
  allCompanies: Company[] = [];
  allTrainings: Training[] = [];
  allTrainers: Trainer[] = [];

  constructor(
    private interSessionService: InterSessionService,
    private intraSessionService: IntraSessionService,
    private alert: AlertService,
    private router: Router,
    private toastService: AlertService,
    private companyService: CompanyService,
    private trainingService: TrainingService,
    private trainerService: TrainerService
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.getAllCompanies();
    this.getAllTrainings();
    this.getAllTrainers();
  }

  initForm() {
    this.sessionForm = new FormGroup({
      sessionType: new FormControl(''),
      code: new FormControl(''),
      duration: new FormControl(''),
      price: new FormControl(''),
      description: new FormControl(''),
      status: new FormControl(''),
      date: new FormControl(''),
      location: new FormControl(''),
      sessionScore: new FormControl(''),
      minParticipants: new FormControl(''),
      company: new FormControl(''),
      training: new FormControl(''),
      trainer: new FormControl(''),
    });
  }

  getAllCompanies() {
    this.isFormSessionLoading = true;
    this.companyService.getAll().subscribe(
      (next) => {
        this.allCompanies = next;
        this.isFormSessionLoading = false;
      },
      (err) => {
        this.alert.alertError(
          err.error !== null
            ? err.error.message
            : 'Impossible de récupérer les companies'
        );
      }
    );
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

  get sessionType() {
    return this.sessionForm.get('sessionType')?.value;
  }

  saveSession() {
    this.isFormSessionLoading = true;
    switch (this.sessionType) {
      case 'InterSession':
        this.saveInterSession();
        break;

      case 'IntraSession':
        this.saveIntraSession();
        break;

      default:
        this.toastService.alertError(
          "Aucun type de session n'a pas été choisi."
        );
        break;
    }
  }

  saveInterSession() {
    let interSessionSave = this.createInterSession();
    this.interSessionService
      .save(interSessionSave)
      .pipe(
        tap(
          (value) => {
            this.responseSuccesOnSave(value);
          },
          (error) => {
            this.responseErrorOnSave(error);
          }
        )
      )
      .subscribe();
  }

  saveIntraSession() {
    let intraSessionSave = this.createIntraSession();
    this.intraSessionService
      .save(intraSessionSave)
      .pipe(
        tap(
          (value) => {
            this.responseSuccesOnSave(value);
          },
          (error) => {
            this.responseErrorOnSave(error);
          }
        )
      )
      .subscribe();
  }

  createInterSession(): InterSession {
    const formValues = this.sessionForm.value;
    this.interSessionValue = {
      ...formValues,
      training: this.allTrainings.find(
        (t) => t.id === parseInt(formValues.training)
      ),
      trainer: this.allTrainers.find(
        (t) => t.id === parseInt(formValues.trainer)
      ),
    };

    return this.interSessionValue;
  }
  createIntraSession(): IntraSession {
    const formValues = this.sessionForm.value;
    this.intraSessionValue = {
      ...formValues,
      company: this.allCompanies.find(
        (c) => c.id === parseInt(formValues.company.id)
      ),
    };
    return this.intraSessionValue;
  }

  responseSuccesOnSave(response: any) {
    console.log(response)
    this.toastService.alertSuccess('Enregistrement effectué avec succès!');
    this.isFormSessionLoading = false;
    this.sessionForm.reset();
    setTimeout(() => {
      this.sessionForm.reset();
      window.location.reload();
    }, 10);
  }

  responseErrorOnSave(error: any) {
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
}
