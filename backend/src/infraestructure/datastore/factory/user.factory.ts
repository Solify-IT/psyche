/* eslint-disable no-param-reassign */
import Faker from 'faker/locale/es_MX';
import { define } from 'typeorm-seeding';
import { User } from 'domain/model';

define(User, (faker: typeof Faker, context: { password: string }) => {
  faker.locale = 'es_MX';

  const address = `${faker.address.city()} ${faker.address.streetAddress()}`;

  const user = new User();
  user.username = 'admin';
  user.name = faker.name.firstName();
  user.address = address;
  user.zipCode = faker.address.zipCode('#####');
  user.email = faker.internet.email();
  user.role = 'Administrador';
  user.password = context.password;
  return user;
});
