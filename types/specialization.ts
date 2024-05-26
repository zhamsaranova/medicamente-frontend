import { IExpert } from "./expert.type";

export type TSpecialization = {
  id: number;
  name: string;
  experts: IExpert[];
};
