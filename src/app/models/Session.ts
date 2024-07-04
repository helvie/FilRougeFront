import { Trainer } from "./Trainer";
import { Training } from "./Training";

export interface Session{
    id: number;
    code: string;
    duration: number;
    price: number;
    description: string;
    status: string;
    date: Date,
    location: string;
    sessionScore: number;
    creationDate: Date;
    updateDate: Date
    training : Training;
    trainer : Trainer
}