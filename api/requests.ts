import axios from "axios";
import { axiosInstance } from "./axios-instance";
import { TCreateAppointment } from "../components/blocks/AppointmentForm";
import { IService } from "../types/service.type";
import { IExpert } from "../types/expert.type";
import { TSpecialization } from "../types/specialization";
import { TRecordTime } from "../types/record-time";

export const ExpertsService = {
  async getAll() {
    try {
      const { data } = await axiosInstance.get<IExpert[]>("/expert");
      return data;
    } catch (e) {
      throw e
    }
  },
  async getOneBySlug(slug: string) {
    try {
      const { data } = await axiosInstance.get<IExpert[]>(
        "/expert/slug/" + slug,
      );
      return data;
    } catch (e) {
      console.log(e);
    }
  },
};
export const ServicesService = {
  async getAll() {
    try {
      const { data } = await axiosInstance.get<IService[]>("/service");
      return data;
    } catch (e) {
      console.log(e);
    }
  },
  async getOneBySlug(slug: string) {
    try {
      const { data } = await axiosInstance.get<IService>(
        "/service/slug/" + slug,
      );
      return data;
    } catch (e) {
      console.log(e);
    }
  },
};
export const SpecializationsService = {
  async getAll() {
    try {
      const { data } = await axiosInstance.get<TSpecialization[]>(
        "/specialization",
      );
      return data;
    } catch (e) {
      console.log(e);
    }
  },
};

export const RecordTimeService = {
  async getAll() {
    try {
      const { data } = await axiosInstance.get<TRecordTime[]>("/record-time");
      return data;
    } catch (e) {
      console.log(e);
    }
  },
};

export const AppointmentService = {
  async create(body: TCreateAppointment) {
    try {
      const { data } = await axiosInstance.post("/appointment", body);
      return data;
    } catch (e) {
      console.log(e);
    }
  },
};
