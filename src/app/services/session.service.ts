import { HttpClient } from "@angular/common/http";
import { Session } from "../models/Session";
import { CrudService } from "./crud.service";
import { URL_BASE } from "../conf/constant";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class SessionService extends CrudService<Session>{

    constructor(http: HttpClient){
        const url: string = URL_BASE;
        super(http, `${url}/sessions`);
    }
}