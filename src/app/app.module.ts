import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ClientsComponent} from './views/clients/clients.component';
import {InsertClientComponent} from './views/clients/insert-client/insert-client.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgSelectModule} from '@ng-select/ng-select';
import {NgxPaginationModule} from 'ngx-pagination';
import {ConfirmBoxConfigModule, NgxAwesomePopupModule} from "@costlydeveloper/ngx-awesome-popup";
import {LoginComponent} from './public/login/login.component';
import {AuthInterceptor} from "./interceptor/auth.interceptor";
import { FormateursComponent } from './views/formateurs/formateurs.component';
import { InsertFormateurComponent } from './views/formateurs/insert-formateur/insert-formateur.component';
import { FormationsComponent } from './views/formations/formations.component';
import { EditFormationComponent } from './views/formations/edit-formation/edit-formation.component';
import { SessionsComponent } from './views/sessions/sessions.component';
import { EditSessionComponent } from './views/sessions/edit-session/edit-session.component';
import { AddSessionComponent } from './views/sessions/add-session/add-session.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientsComponent,
    InsertClientComponent,
    LoginComponent,
    FormateursComponent,
    InsertFormateurComponent,
    EditSessionComponent,
    AddSessionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    NgSelectModule,
    ToastrModule.forRoot(),
    NgxAwesomePopupModule.forRoot(),
    ConfirmBoxConfigModule.forRoot(),
    FormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
