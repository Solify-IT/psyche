import { wrapError } from '@types';
import UserInteractor from 'app/interactor/userInteractor';
import PatientArea from 'domain/model/user/patientArea';
import UserLoginResult from 'domain/model/user/userLoginResult';
import { IContext } from 'utils/context';
import getRequestUser from 'utils/getRequestUser';

export default class UserController {
  userInteractor: UserInteractor;

  constructor(userInteractor: UserInteractor) {
    this.userInteractor = userInteractor;
  }

  async registerUser(context: IContext): Promise<void> {
    const [user, error] = await wrapError(this.userInteractor.register(context.request.body));

    if (error) {
      context.next(error);
      return;
    }
    context.response.status(200).json(user);
  }

  async registerProfile(context: IContext): Promise<void> {
    const token = context.request.headers.authorization.split(' ')[1];
    const user : UserLoginResult = getRequestUser(token);
    const request : PatientArea[] = Object.values(context.request.body);
    const areas : PatientArea[] = [];
    request.forEach((area) => {
      areas.push({
        name: area.name,
        userId: user.id,
        checked: area.checked,
      });
    });
    const [, error] = await wrapError(
      this.userInteractor.registerProfile(areas),
    );
    if (error) {
      context.next(error);
      return;
    }

    const [userProfileSet, userError] = await wrapError(
      this.userInteractor.userProfileSet(user.id),
    );
    if (userError) {
      context.next(userError);
      return;
    }
    context.response.status(200).json(userProfileSet);
  }

  async getUsers(context: IContext): Promise<void> {
    const token = context.request.headers.authorization.split(' ')[1];
    const user : UserLoginResult = getRequestUser(token);
    const [users, error] = await wrapError(this.userInteractor.getOne(user.id));
    if (error) {
      context.next(error);
      return;
    }

    context.response.status(200).json(users);
  }

  async modifyProfile(context: IContext): Promise<void> {
    const token = context.request.headers.authorization.split(' ')[1];
    const user : UserLoginResult = getRequestUser(token);
    const request : PatientArea[] = Object.values(context.request.body);
    const areas : PatientArea[] = [];
    request.forEach((area) => {
      areas.push({
        id: area.id,
        name: area.name,
        userId: user.id,
        checked: area.checked,
      });
    });
    const [patientAreas, error] = await wrapError(
      this.userInteractor.modifyProfile(areas),
    );
    if (error) {
      context.next(error);
      return;
    }
    context.response.status(200).json(patientAreas);
  }

  async getUserPatientAreas(context: IContext): Promise<void> {
    const token = context.request.headers.authorization.split(' ')[1];
    const user : UserLoginResult = getRequestUser(token);
    const request : PatientArea[] = Object.values(context.request.body);
    const areas : PatientArea[] = [];
    request.forEach((area) => {
      areas.push({
        name: area.name,
        userId: user.id,
        checked: area.checked,
      });
    });
    const [patientAreas, error] = await wrapError(
      this.userInteractor.getUserAreas(user.id),
    );
    if (error) {
      context.next(error);
      return;
    }
    context.response.status(200).json(patientAreas);
  }

  async login(context: IContext): Promise<void> {
    const { username, password } = context.request.body;
    const [loginResult, error] = await wrapError(this.userInteractor.login(username, password));

    if (error) {
      context.next(error);
      return;
    }

    context.response.status(200).json(loginResult);
  }

  async updateProfile(context: IContext): Promise<void> {
    const id = parseInt(context.request.params.id);
    const [userProfile, error] = await
    wrapError(this.userInteractor.updateProfile({ id, ...context.request.body }));

    if (error) {
      context.next(error);
      return;
    }
    context.response.status(200).json(userProfile);
  }
}