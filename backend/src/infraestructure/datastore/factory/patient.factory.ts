/* eslint-disable no-param-reassign */
import Faker from 'faker/locale/es_MX';
import { define } from 'typeorm-seeding';
import { Patient } from 'domain/model';
import Record from 'domain/model/record';

define(Record, () => {
  const record = new Record();
  record.patients = [];
  return record;
});

define(Patient, (faker: typeof Faker, context: { recordId: number, type: string }) => {
  faker.locale = 'es_MX';
  const gender = faker.random.arrayElement<number>([0, 1]);
  const name = faker.name.firstName(gender);
  const lastName = faker.name.lastName(gender);
  const zipCode = faker.address.zipCode('#####');
  const address = `${faker.address.city()} ${faker.address.streetAddress()}`;

  const telephone = faker.phone.phoneNumber();
  const birthPlace = faker.address.city();
  const birthDate = faker.date.past(60);
  const patient = new Patient();
  patient.name = name;
  patient.lastName = lastName;
  patient.gender = gender === 1 ? 'Hombre' : 'Mujer';
  patient.postalCode = Number(zipCode);
  patient.telephone = telephone;
  patient.address = address;
  patient.birthDate = birthDate;
  patient.birthPlace = birthPlace;
  patient.recordId = context.recordId;
  patient.type = context.type;
  return patient;
});
