import { wrapError } from '@types';
import IUserPresenter from 'app/presenter/userPresenter';
import IUserRepository from 'app/repository/userRepository';
import { User } from 'domain/model';
import LoginResult from 'domain/model/user/loginResult';
import PatientArea from 'domain/model/user/patientArea';
import InvalidDataError from 'utils/errors/InvalidDataError';

export default class UserInteractor {
  userRepository: IUserRepository;

  userPresenter: IUserPresenter;

  constructor(userRepository: IUserRepository, userPresenter : IUserPresenter) {
    this.userPresenter = userPresenter;
    this.userRepository = userRepository;
  }

  async register(user: User): Promise<User> {
    if (!this.isValidUser(user)) {
      throw new InvalidDataError('El usuario no es valido.');
    }
    const [results, error] = await wrapError(this.userRepository.register(user));

    if (error) {
      throw error;
    }
    return this.userPresenter.register(results);
  }

  async registerDoctorProfile(id: number,
    areas: PatientArea[], workSchedule: string): Promise<PatientArea[]> {
    const [results, error] = await wrapError(
      this.userRepository.registerDoctorProfile(id, areas, workSchedule),
    );
    if (error) {
      throw error;
    }
    return results;
  }

  async getUser(username: string): Promise<User> {
    const [results, error] = await wrapError(this.userRepository.getUser(username));
    if (error) {
      throw error;
    }
    return this.userPresenter.getUser(results);
  }

  async updateProfile(user: User): Promise<User> {
    const [result, error] = await wrapError(this.userRepository.updateProfile(user));
    if (error) {
      throw error;
    }
    return this.userPresenter.findOne(result);
  }

  async getUserAreas(id: number): Promise<PatientArea[]> {
    const [results, error] = await wrapError(this.userRepository.getUserPatientAreas(id));
    if (error) {
      throw error;
    }
    return this.userPresenter.patientAreas(results);
  }

  async userProfileSet(id: number) : Promise<User> {
    const [result, error] = await wrapError(this.userRepository.setUserFirstTime(id, false));
    if (error) {
      throw error;
    }

    if (result) {
      return result;
    }
    throw new InvalidDataError('User not found.');
  }

  async getAll(): Promise<User[]> {
    const [users, error] = await wrapError(this.userRepository.findAll());

    if (error) {
      throw error;
    }

    return this.userPresenter.findAll(users);
  }

  async getOne(id: number): Promise<User> {
    const [users, error] = await wrapError(this.userRepository.findOne(id));

    if (error) {
      throw error;
    }

    return users;
  }

  async login(username: string, password: string): Promise<LoginResult> {
    const [user, error] = await wrapError(this.userRepository.login(username, password));

    if (error) {
      throw error;
    }
    return this.userPresenter.login(user);
  }

  async deactivateAccount(id: number): Promise<User>{
    const [result, error] = await wrapError(this.userRepository.deactiveAccount(id));
    if(error) {
      throw error;
    }
    return this.userPresenter.deactiveAccount(result);
  }
  
  async changePassword(id: number, newPassword: string) {
    const encryptedPassword = await this.userPresenter.encryptedPassword(newPassword);
    const [user, error] = await wrapError(
      this.userRepository.changePassword(id, encryptedPassword),
    );

    if (error) {
      throw error;
    }
    return user;
  }

  async passwordValid(username: string, password: string) {
    const [user, error] = await wrapError(
      this.userRepository.login(username, password),
    );

    if (error) {
      throw error;
    }
    return user;
  }

  isValidUser(user: User) : boolean {
    if (user.password.length < 8) {
      return false;
    }
    if (user.username === '') {
      return false;
    }
    return true;
  }
}
