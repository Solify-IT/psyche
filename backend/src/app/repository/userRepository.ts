import { User } from 'domain/model';

export default interface IUserRepository {
  login(username: string, password: string) : Promise<User>;
}
