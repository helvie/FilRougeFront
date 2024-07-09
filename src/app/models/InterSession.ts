import { Particular } from './Particular';
import { Trainer } from './Trainer';
import { Training } from './Training';

export interface InterSession {
  id: number;
  code: string;
  duration: number;
  price: number;
  description: string;
  status: string;
  date: Date;
  location: string;
  sessionScore: number;
  creationDate: Date;
  updateDate: Date;
  minParticipants: number;
  training: Training;
  trainer: Trainer;
}

export const EmptyInterSession: InterSession = {
  id: 0,
  code: '',
  duration: 0,
  price: 0.0,
  description: '',
  status: '',
  date: new Date(),
  location: '',
  sessionScore: 0,
  creationDate: new Date(),
  updateDate: new Date(),
  minParticipants: 0,
  training: {
    id: 0,
    title: '',
    description: '',
    trainingPrice: 0.0,
    logo: '',
    creationDate: new Date(),
    updateDate: new Date(),
    subThemes: [],
    requirement: {
      id: 0,
      name: '',
      description: '',
      link: '',
      creationDate: new Date(),
      updateDate: new Date(),
    },
  },
  trainer: {
    id: 0,
    firstname: '',
    lastname: '',
    gender: '',
    activity: '',
    address: '',
    email: '',
    cv_link: '',
    id_akdemia_validation_test: 0,
    login: '',
    password: '',
    phone: '',
    photo: '',
    creationDate: new Date(),
    updateDate: new Date(),
  },
};

export interface InterSessionWithSubscriptions {
  id: number;
  code: string;
  duration: number;
  price: number;
  description: string;
  status: string;
  date: Date;
  location: string;
  sessionScore: number;
  creationDate: Date;
  updateDate: Date;
  minParticipants: number;
  particularSubscription: ParticularSubscription;
  training: Training;
  trainer: Trainer;
  particularSubscriptions?: ParticularSubscription[];
}

export interface ParticularSubscription {
  id: number;
  status: string;
  creationDate: Date;
  updateDate: Date;
  particular?: Particular;
}

export const EmptyInterSessionWithSubscriptions: InterSessionWithSubscriptions = {
  id: 0,
  code: '',
  duration: 0,
  price: 0.0,
  description: '',
  status: '',
  date: new Date(),
  location: '',
  sessionScore: 0,
  creationDate: new Date(),
  updateDate: new Date(),
  minParticipants: 0,
  particularSubscription: {
    id: 0,
    status: '',
    creationDate: new Date(),
    updateDate: new Date(),
    // particular:  {
    //   id: 0,
    //   activity: "",
    //   firstname: "",
    //   lastname: "",
    //   gender: "",
    //   highestDiploma: "",
    //   birthDate: new Date()
    // }
  },
  particularSubscriptions: [
    {
      creationDate: new Date(),
      id: 0,
      particular: {
        activity: '',
        address: '',
        birthDate: new Date(),
        creationDate: new Date(),
        email: '',
        firstname: 'Jean',
        gender: '',
        highestDiploma: '',
        id: 25,
        lastname: '',
        login: '',
        password: '',
        phone: '',
        photo: '',
        updateDate: new Date(),
      },
      status: '',
      updateDate: new Date(),
    },
  ],
  training: {
    id: 0,
    title: '',
    description: '',
    trainingPrice: 0.0,
    logo: '',
    creationDate: new Date(),
    updateDate: new Date(),
    subThemes: [],
    requirement: {
      id: 0,
      name: '',
      description: '',
      link: '',
      creationDate: new Date(),
      updateDate: new Date(),
    },
  },
  trainer: {
    id: 0,
    firstname: '',
    lastname: '',
    gender: '',
    activity: '',
    address: '',
    email: '',
    cv_link: '',
    id_akdemia_validation_test: 0,
    login: '',
    password: '',
    phone: '',
    photo: '',
    creationDate: new Date(),
    updateDate: new Date(),
  },
};

