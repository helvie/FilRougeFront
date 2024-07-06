import { Component } from '@angular/core';
import { InterSession, EmptyInterSession } from 'src/app/models/InterSession';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InterSessionService } from 'src/app/services/inter-session.service';
import { AlertService } from 'src/app/services/alert.service';
import { tap } from 'rxjs';
import { Status } from '../../sessions.utils';
@Component({
  selector: 'app-edit-inter-sesssion',
  templateUrl: './edit-inter-sesssion.component.html',
  styleUrls: ['./edit-inter-sesssion.component.scss']
})
export class EditInterSesssionComponent {
  id!:number;
  interSessionDetail : InterSession = EmptyInterSession;

  statusValues: String[] = Object.values(Status);
  isFormSessionLoading!: boolean;
  interSessionFormUpdate: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private interSessionService: InterSessionService,
    private alert: AlertService,
    private toastService: AlertService,
    private router: Router
  ){
    this.interSessionFormUpdate = this.formBuilder.group({
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
    this.handlerGetInterSessionById();
    this.initForm();
  }


  initForm() {
    this.interSessionFormUpdate = new FormGroup({
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

  handlerGetInterSessionById() {
    this.interSessionService.getById(this.id).subscribe(
      (data) => {
        this.interSessionDetail = data;
        this.interSessionFormUpdate.patchValue({
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

  updateInterSession() {
    this.isFormSessionLoading = true;
    let interSessionUpdate = this.interSessionFormUpdate.value;
    const interSessionId = this.id;
    console.log(interSessionUpdate);
    let creationDate = interSessionUpdate.creationDate;
    interSessionUpdate.updateDate = new Date();

    this.interSessionService
      .edit(interSessionId, interSessionUpdate)
      .pipe(
        tap(
          (value) => {
            let sessionResponse = value;
            this.toastService.alertSuccess(
              'Modification effectuée avec succès!'
            );
            this.isFormSessionLoading = false;
            this.interSessionFormUpdate.reset();
            this.router.navigate(['dashboard/intersessions']);
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
    this.router.navigate(['/dashboard/intersessions']);
  }
}
