import { IService } from "./service.type";
import { TSpecialization } from "./specialization";

export interface IExpert {
  id: number;

  firstName: string;
  lastName: string;
  middleName?: string;
  photo?: string;

  slug: string;
  experienceInYears?: number;
  rank?: number;

  tags?: string[];
  specializations?: TSpecialization[];

  services: IService[];
  recordDates: Date[];
  appointments: IAppointment[];
}

export interface IOverridedExpert extends Omit<IExpert, "id" | "services"> {
  services: string[];
}

export interface IAppointment {
  id: number;
  confirmed: boolean;
  birthDate: string;
  date: string;
  email: string;
  fullname: string;
  phone: string;
}