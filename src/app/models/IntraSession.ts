import { Company } from "./Company"

export interface IntraSession{
    id: number,
    code: string,
    duration: number,
    price: number,
    description: string,
    status: string,
    date: Date,
    location: string,
    sessionScore: number,
    creationDate: Date,
    updateDate: Date,
    company: Company 
}

export const EmptyIntraSession  : IntraSession = {
    id: 0,
    code: '',
    duration: 0,
    price: 0.0,
    description: "",
    status: "",
    date: new Date(),
    location: "",
    sessionScore: 0,
    creationDate: new Date(),
    updateDate: new Date(),
    company: {
        id: 0,
        name: "",
        phone: "",
        email: "",
        address: "",
        login: "",
        password: "",
        photo: "",
        creationDate: new Date(),
        updateDate: new Date(),
        activity: "",
        employees: []
    }
  }