import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';
import { EmptyIntraSession, IntraSession } from 'src/app/models/IntraSession';
import { AlertService } from 'src/app/services/alert.service';
import { IntraSessionService } from 'src/app/services/intra-session.service';
import { Status, formatDate } from '../../sessions.utils';
import { CompanyService } from 'src/app/services/company.service';
import { Company } from 'src/app/models/Company';

@Component({
  selector: 'app-edit-intra-sesssion',
  templateUrl: './edit-intra-sesssion.component.html',
  styleUrls: ['./edit-intra-sesssion.component.scss'],
})
export class EditIntraSesssionComponent {
  id!: number;
  intraSessionDetail: IntraSession = EmptyIntraSession;

  statusValues: String[] = Object.values(Status);
  allCompanies: Company[] = [];
  isFormSessionLoading!: boolean;
  intraSessionFormUpdate: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private intraSessionService: IntraSessionService,
    private companyService: CompanyService,
    private alert: AlertService,
    private toastService: AlertService,
    private router: Router
  ) {
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
      company: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.handlerGetIntraSessionById();
    this.getAllCompanies();
    this.initForm();
  }

  initForm() {
    this.intraSessionFormUpdate.patchValue({
      code: this.intraSessionDetail.code,
      id: this.intraSessionDetail.id,
      duration: this.intraSessionDetail.duration,
      price: this.intraSessionDetail.price,
      status: this.intraSessionDetail.status,
      date: formatDate(this.intraSessionDetail.date),
      location: this.intraSessionDetail.location,
      sessionScore: this.intraSessionDetail.sessionScore,
      description: this.intraSessionDetail.description,
      company: this.intraSessionDetail.company?.id  
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

  handlerGetIntraSessionById() {
    this.intraSessionService.getById(this.id).subscribe(
      (data) => {
        this.intraSessionDetail = data;
        this.initForm();
      },
      (err) => {
        this.alert.alertError(
          err.error !== null ? err.error.message : "une erreur s'est produite"
        );
      }
    );
  }

  isSelectedCompany(companyId: number) {
    return this.allCompanies.some(
      (selectedCompany) => selectedCompany.id === companyId
    );
  }

  isSelectedStatus(status: String): boolean {
    return this.statusValues.some(
      (selectedStatus) => selectedStatus === status
    );
  }

  updateIntraSession() {
    this.isFormSessionLoading = true;
    const interSessionId = this.id;

    const formValues = this.intraSessionFormUpdate.value;
    let intraSessionUpdate = {
      ...formValues,
      company: this.allCompanies.find(
        (c) => c.id === parseInt(formValues.company)
      ),
    };

    this.intraSessionService
      .edit(interSessionId, intraSessionUpdate)
      .pipe(
        tap(
          (value) => {
            console.log(value);
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
