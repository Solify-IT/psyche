import { wrapError } from '@types';
import { Doctor } from 'domain/model';
import IDoctorRepository from 'app/repository/doctorRepository';
import IDoctorPresenter from 'app/presenter/doctorPresenter';

export default class DoctorInteractor {
  doctorRepository: IDoctorRepository;

  doctorPresenter: IDoctorPresenter;

  constructor(doctorRepository: IDoctorRepository, doctorPresenter: IDoctorPresenter) {
    this.doctorRepository = doctorRepository;
    this.doctorPresenter = doctorPresenter;
  }

  async getAll(): Promise<Doctor[]> {
    const [doctors, error] = await wrapError(this.doctorRepository.findAll());

    if (error) {
      throw error;
    }
    return this.doctorPresenter.findAll(doctors);
  }

  async getAllOld(): Promise<Doctor[]> {
    const [doctors, error] = await wrapError(this.doctorRepository.findAll());

    if (error) {
      throw error;
    }
    return this.doctorPresenter.findAllOld(doctors);
  }
}
