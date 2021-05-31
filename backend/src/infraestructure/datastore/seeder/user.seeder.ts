import bcrypt from 'bcrypt';
import { User } from 'domain/model';
import { Factory, Seeder } from 'typeorm-seeding';

export default class CreateUser implements Seeder {
  public async run(factory: Factory): Promise<any> {
    const password = await bcrypt.hash('Admin123$', 8);
    const username = 'admin';
    const role = 'Administrador';
    await factory(User)({ username, role, password }).create();

    const passwordBec = await bcrypt.hash('Becario123$', 8);
    const usernameBec = 'becario';
    const roleBec = 'Becario';
    await factory(User)({ username: usernameBec, role: roleBec, password: passwordBec }).create();

    const passwordPsi = await bcrypt.hash('Doctor123$', 8);
    const usernamePsi = 'doctor';
    const rolePsi = 'Psicólogo';
    await factory(User)({ username: usernamePsi, role: rolePsi, password: passwordPsi }).create();

    console.log('\n\nInitial users created :)\n\n');
  }
}
