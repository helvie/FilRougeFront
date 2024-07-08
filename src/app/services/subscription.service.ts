import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CrudService } from './crud.service';
import { URL_BASE } from '../conf/constant';
import { Subscription } from '../models/Subscription';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService extends CrudService<Subscription> {
  private particularSubscriptionUrl = `${URL_BASE}/particularSubscription`;
  private employeeSubscriptionUrl = `${URL_BASE}/employeeSubscription`;

  constructor(private http: HttpClient) {
    super(http, `${URL_BASE}/subscriptions`);
  }

  // Enregistrer une personne à une interSession
  subscribePersonToInterSession(personId: number, sessionId: number): Observable<any> {
    const subscription = {
      particular: { id: personId },
      interSession: { id: sessionId },
      status: 'OPEN',
      creationDate: new Date().toISOString(),
      updateDate: new Date().toISOString()
    };
    return this.httpClient.post<any>(this.particularSubscriptionUrl, subscription);  }

  // Enregistrer une personne à une intraSession
  subscribePersonToIntraSession(personId: number, sessionId: number): Observable<any> {
    const subscription = {
      employee: { id: personId },
      intraSession: { id: sessionId },
      status: 'OPEN',
      creationDate: new Date().toISOString(),
      updateDate: new Date().toISOString()
    };
    return this.httpClient.post<any>(this.employeeSubscriptionUrl, subscription);  }
}