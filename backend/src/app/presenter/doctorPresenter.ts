import { Doctor } from 'domain/model';

export default interface IDoctorPresenter {
  findAll(doctors: Doctor[]) : Doctor[];
  findAllOld(doctors: Doctor[]) : Doctor[];
}
