import { Injectable } from "@angular/core";
import { CrudService } from "./crud.service";
import { InterSession, InterSessionWithSubscriptions } from "../models/InterSession";
import { HttpClient } from "@angular/common/http";
import { URL_BASE } from "../conf/constant";
import { IntraSession } from "../models/IntraSession";

@Injectable({
    providedIn: 'root'
})
export class InterSessionService extends CrudService<InterSession>{
    constructor(http: HttpClient){
        const url : string = URL_BASE;
        super(http, `${url}/intersessions`)
    }
}

@Injectable({
    providedIn: 'root'
})
export class InterSessionServiceWithSubscriptions extends CrudService<InterSessionWithSubscriptions>{
    constructor(http: HttpClient){
        const url : string = URL_BASE;
        super(http, `${url}/intersessions/with-subscriptions`)
    }
}