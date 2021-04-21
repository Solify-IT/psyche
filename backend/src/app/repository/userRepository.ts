import { User } from 'domain/model';

export default interface IUserRepository {
  register(user: User) : Promise <User>;
  login(username: string, password: string) : Promise<User>;
}
