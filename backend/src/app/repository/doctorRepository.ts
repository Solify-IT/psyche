import { Doctor } from 'domain/model';

export default interface IDoctorRepository {
  findAll() : Promise<Doctor[]>;
}
