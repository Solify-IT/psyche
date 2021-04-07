import IDoctorPresenter from 'app/presenter/doctorPresenter';
import { Doctor } from 'domain/model';

export default class DoctorPresenter implements IDoctorPresenter {
  findAll(doctors: Doctor[]): Doctor[] {
    return doctors;
  }

  findAllOld(doctors: Doctor[]): Doctor[] {
    return doctors.filter((doctor) => doctor.age > 50);
  }
}
