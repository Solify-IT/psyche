import { User } from 'domain/model';
import IUserPresenter from 'app/presenter/userPresenter';
import LoginResult from 'domain/model/user/loginResult';
import jwt from 'jsonwebtoken';
import jwtConfig from 'utils/jwtConfig';
import PatientArea from 'domain/model/user/patientArea';

export default class UserPresenter implements IUserPresenter {
  findOne(id: number): User {
    throw new Error('Method not implemented.');
  }
  expiresIn: string = '30 days';

  patientAreas(areas: PatientArea[]): PatientArea[] {
    return areas;
  }

  getUser(user: User): User {
    return user;
  }

  login(user: User): LoginResult {
    const userLoginResult = {
      id: user.id,
      username: user.username,
      name: user.name,
      email: user.email,
      role: user.role,
      firstTime: user.firstTime,
      areas: user.patientAreas,
    };
    const token = jwt.sign({ user: userLoginResult },
      jwtConfig.secret, { expiresIn: this.expiresIn });

    return { user: userLoginResult, token };
  }

  register(user: User): User {
    return user;
  }

  findAll(users: User[]): User[] {
    return users;
  }
  updateProfile(user: User): User {
    return user;
  }
}
