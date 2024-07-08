import { Injectable } from "@angular/core";
import { CrudService } from "./crud.service";
import { HttpClient } from "@angular/common/http";
import { URL_BASE } from "../conf/constant";
import { IntraSession } from "../models/IntraSession";

@Injectable({
    providedIn: 'root'
})
export class IntraSessionService extends CrudService<IntraSession>{
    constructor(http: HttpClient){
        const url : string = URL_BASE;
        super(http, `${url}/intrasessions/with-subscriptions`)
    }
}