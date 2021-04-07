import { wrapError } from '@types';
import DoctorInteractor from 'app/interactor/doctorInteractor';
import { IContext } from 'utils/context';

export default class DoctorController {
  doctorInteractor: DoctorInteractor;

  constructor(doctorInteractor: DoctorInteractor) {
    this.doctorInteractor = doctorInteractor;
  }

  async getDoctors(context: IContext): Promise<void> {
    const [doctors, error] = await wrapError(this.doctorInteractor.getAll());

    if (error) {
      context.next(error);
      return;
    }
    context.response.status(200).json(doctors);
  }

  async getDoctorsOld(context: IContext): Promise<void> {
    const [doctors, error] = await wrapError(this.doctorInteractor.getAllOld());

    if (error) {
      context.next(error);
      return;
    }
    context.response.status(200).json(doctors);
  }
}
