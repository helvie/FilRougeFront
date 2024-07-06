import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';
import { EmptyIntraSession, IntraSession } from 'src/app/models/IntraSession';
import { AlertService } from 'src/app/services/alert.service';
import { IntraSessionService } from 'src/app/services/intra-session.service';
import { Status } from '../../sessions.utils';

@Component({
  selector: 'app-edit-intra-sesssion',
  templateUrl: './edit-intra-sesssion.component.html',
  styleUrls: ['./edit-intra-sesssion.component.scss']
})
export class EditIntraSesssionComponent {
  id!:number;
  intraSessionDetail : IntraSession = EmptyIntraSession;

  statusValues: String[] = Object.values(Status);
  isFormSessionLoading!: boolean;
  intraSessionFormUpdate: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private intraSessionService: IntraSessionService,
    private alert: AlertService,
    private toastService: AlertService,
    private router: Router
  ){
    this.intraSessionFormUpdate = this.formBuilder.group({
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
    this.handlerGetIntraSessionById();
    this.initForm();
  }


  initForm() {
    this.intraSessionFormUpdate = new FormGroup({
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

  handlerGetIntraSessionById() {
    this.intraSessionService.getById(this.id).subscribe(
      (data) => {
        this.intraSessionDetail = data;
        this.intraSessionFormUpdate.patchValue({
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

  updateIntraSession() {
    this.isFormSessionLoading = true;
    let intraSessionUpdate = this.intraSessionFormUpdate.value;
    const interSessionId = this.id;
    console.log(intraSessionUpdate);
    let creationDate = intraSessionUpdate.creationDate;
    intraSessionUpdate.updateDate = new Date();

    this.intraSessionService
      .edit(interSessionId, intraSessionUpdate)
      .pipe(
        tap(
          (value) => {
            let sessionResponse = value;
            this.toastService.alertSuccess(
              'Modification effectuée avec succès!'
            );
            this.isFormSessionLoading = false;
            this.intraSessionFormUpdate.reset();
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
