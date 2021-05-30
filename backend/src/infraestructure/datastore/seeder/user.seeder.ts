import bcrypt from 'bcrypt';
import { User } from 'domain/model';
import { Factory, Seeder } from 'typeorm-seeding';

export default class CreateUser implements Seeder {
  public async run(factory: Factory): Promise<any> {
    const password = await bcrypt.hash('Admin123$', 8);
    await factory(User)({ password }).create();
    console.log('\n\nInitial user created :)\n\n');
  }
}
