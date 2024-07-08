import {Component, OnInit} from '@angular/core';
import {Theme} from 'src/app/models/Theme';
import {Trainer} from 'src/app/models/Trainer';
import {Training} from 'src/app/models/Training';
import {ThemeService} from 'src/app/services/theme.service';
import {TrainerService} from 'src/app/services/trainer.service';
import {TrainingService} from 'src/app/services/training.service';
import {EmployeeService} from "../../services/employee.service";
import {ParticularService} from "../../services/particular.service";
import {Employee} from "../../models/Employee";
import {Particular} from "../../models/Particular";
import { Session } from 'src/app/models/Session';
import { SessionService } from 'src/app/services/session.service';
import { ClientsComponent } from '../clients/clients.component';

@Component({
  selector: 'app-content-dashboard',
  templateUrl: './content-dashboard.component.html',
  styleUrls: ['./content-dashboard.component.scss']
})
export class ContentDashboardComponent implements OnInit {

  constructor(
    private themeService: ThemeService,
    private formationService: TrainingService,
    private formateurSevice: TrainerService,
    private employeeService: EmployeeService,
    private particularService: ParticularService,
    private sessionService: SessionService
  ) {
  }

  listeTheme: Theme[] = [];
  listeFormation: Training[] = [];
  listeFormateur: Trainer[] = [];

  listeEmployees: Employee[] = [];
  listeParticulars: Particular[] = [];
  listeSessions: Session[] = [];

  ngOnInit(): void {
    this.loadThemes();
    this.loadFormation();
    this.loadFormateur();

    this.loadParticipants();
    this.loadSessions();
  }

  loadFormateur() {
    this.formateurSevice.getAll().subscribe({
      next: (data) => this.listeFormateur = data
    })
  }

  loadFormation() {
    this.formationService.getAll().subscribe({
      next: (data) => this.listeFormation = data
    })
  }

  loadThemes() {
    this.themeService.getAll().subscribe({
      next: (data) => this.listeTheme = data
    })
  }

  loadParticipants() {
    this.employeeService.getAll().subscribe({
      next: (data) => this.listeEmployees = data
    })

    this.particularService.getAll().subscribe({
      next: (data) => this.listeParticulars = data
    })
  }

  loadSessions() {
    this.sessionService.getAll().subscribe({
      next: (data) => this.listeSessions = data
    })
  }

}
