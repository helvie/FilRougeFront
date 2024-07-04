import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Status } from '../sessions.utils';
import { SessionService } from 'src/app/services/session.service';
import { Session } from 'src/app/models/Session';
import { AlertService } from 'src/app/services/alert.service';
import { tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-session',
  templateUrl: './edit-session.component.html',
  styleUrls: ['./edit-session.component.scss']
})
export class EditSessionComponent implements OnInit{
  id!: number;
  sessionDetail: Session = {
    id: 0,
    code: '',
    duration: 0,
    price: 0,
    description: '',
    status: '',
    date: new Date(),
    location: '',
    sessionScore: 0,
    creationDate: new Date(),
    updateDate: new Date(),
    trainer: {
      id: 0,
      firstname: '',
      lastname: '',
      gender: "",
      activity: '',
      address: '',
      email: '',
      cv_link: '',
      id_akdemia_validation_test: 0,
      login: '',
      password: '',
      phone: '',
      photo: '',
      creationDate: new Date(),
      updateDate: new Date()
    },
    training: {
      creationDate: new Date(),
      description: '',
      id: 0,
      logo: '',
      requirement: {
        id: 0,
        name: '',
        description: '',
        link: '',
        creationDate: new Date(),
        updateDate: new Date(),
      },
      subThemes: [],
      title: '',
      trainingPrice: 0,
      updateDate: new Date
    }
  }

  statusValues : String[] = Status
  isFormSessionLoading!: boolean;
  sessionFormUpdate:FormGroup;

  constructor(    
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private sessionService : SessionService,
    private alert: AlertService,
    private toastService: AlertService,
    private router: Router
  ){
    this.sessionFormUpdate = this.formBuilder.group({
      id: ['', Validators.required],
      code: ['', Validators.required],
      duration: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      status: [this.statusValues],
      date: ['', Validators.required],
      location: ['', Validators.required],
      sessionScore: ['', Validators.required],
      
      });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.handlerGetSessionById()
    this.initForm()
  }

  initForm() {
    this.sessionFormUpdate = new FormGroup({
      id: new FormControl(''),
      code: new FormControl(''),
      duration: new FormControl(''),
      price: new FormControl(''),
      description: new FormControl(''),
      status: new FormControl([]),
      date: new FormControl([]),
      location: new FormControl([]),
      sessionScore: new FormControl([]),
    });
  }

  handlerGetSessionById() {
    this.sessionService.getById(this.id).subscribe(
      (data) => {
        this.sessionDetail = data;
        this.sessionFormUpdate.patchValue({
          id: data.id,
          code: data.code,
          duration: data.duration,
          description: data.description,
          creationDate: data.creationDate,
          price: data.price,
          status: data.status,
          date: data.date,
          location: data.location,
          sessionScore: data.sessionScore,
        });
      },
      (err) => {
        this.alert.alertError(
          err.error !== null ? err.error.message : "une erreur s'est produite"
        );
      }
    );
  }

  isSelected(status: String): boolean {
    return this.statusValues.some(
      (selectedStatus) => selectedStatus === status
    );
  }

  updateSession() {
    this.isFormSessionLoading = true;
    let sessionUpdate = this.sessionFormUpdate.value;
    const sessionId = this.id;
    console.log(sessionUpdate);
    let creationDate = sessionUpdate.creationDate;
    sessionUpdate.updateDate = new Date();

    this.sessionService
      .edit(sessionId, sessionUpdate)
      .pipe(
        tap(
          (value) => {
            let sessionResponse = value;
            this.toastService.alertSuccess(
              'Modification effectuée avec succès!'
            );
            this.isFormSessionLoading = false;
            this.sessionFormUpdate.reset();
            this.router.navigate(['dashboard/catalogues/formations']);
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
