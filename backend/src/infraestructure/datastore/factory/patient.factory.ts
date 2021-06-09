/* eslint-disable no-case-declarations */
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
  const startDate = faker.date.past(1);
  const patient = new Patient();
  const motives = [
    'Abuso Sexual',
    'Violencia Familiar',
    'Trastornos Mentales',
    'Discapacidad',
    'Intento de Suicidio',
    'Autolesiones',
  ];
  const motive = faker.random.arrayElement<string>(motives);

  switch (motive) {
    case motives[0]: {
      patient.abuseFirstTime = (Math.floor(Math.random() * 50) + 10).toString();
      patient.abuseType = faker.random.arrayElement<string>([
        'Tocamiento',
        'Penetración con pene',
        'Pornografía',
        'Penetración con otro objeto',
        'Presenció relación sexual',
        'Cibernético/Redes/Virtual',
        'Otro',

      ]);
      break;
    }
    case motives[1]: {
      patient.abuseFirstTime = (Math.floor(Math.random() * 60) + 5).toString();
      patient.abuseType = faker.random.arrayElement<string>([
        'Física',
        'Psicológica',
        'Económica',
        'Patrimonial',
        'Intento de Homicidio',
        'Sexual',
        'Otro',

      ]);
      break;
    }
    case motives[2]: {
      patient.abuseFirstTime = (Math.floor(Math.random() * 60) + 5).toString();
      patient.abuseType = faker.random.arrayElement<string>([
        'Psicopatía',
        'Paranoide',
        'Límite de la Personalidad',
        'Esquizofrenia',
        'Psicosis',
        'Bipolaridad',
        'Otro',
      ]);
      break;
    }
    case motives[3]: {
      patient.abuseFirstTime = (Math.floor(Math.random() * 60) + 5).toString();
      patient.abuseType = faker.random.arrayElement<string>([
        'Intelectual',
        'Motríz',
        'Lenguaje',
        'Aprendizaje',
        'Autismo',
        'Otro',
      ]);
      break;
    }
    case motives[4]: {
      patient.abuseFirstTime = (Math.floor(Math.random() * 60) + 5).toString();
      patient.abuseAttempts = (Math.floor(Math.random() * 10) + 1).toString();
      patient.abuseMotive = faker.random.arrayElement<string>([
        'Pastillas',
        'Ahorcamiento',
        'Lanzarse de un auto',
        'Arma blanca',
        'Tomar/Inyectarse líquido intoxicante',
        'Arma de Fuego',
      ]);
      patient.abuseType = faker.random.arrayElement<string>([
        'Adicciones',
        'Violencia familiar',
        'Violencia en la pareja',
        'Trastorno mental',
        'Rompimiento con la pareja',
        'Violación',
        'Abuso sexual',
        'Otro',
      ]);

      break;
    }
    case motives[5]: {
      patient.abuseFirstTime = (Math.floor(Math.random() * 60) + 5).toString();
      patient.abuseType = faker.random.arrayElement<string>([
        'Adicciones',
        'Violencia familiar',
        'Violencia en la pareja',
        'Trastorno mental',
        'Rompimiento con la pareja',
        'Violación',
        'Abuso sexual',
        'Otro',
      ]);
      patient.abuseFirstTime = (Math.floor(Math.random() * 10) + 1).toString();
      patient.abuseMotive = faker.random.arrayElement<string>([
        'Cortes en alguna parte del cuerpo',
        'Golpes',
        'Quemaduras de cigarro',
        'Pellizcos',
        'Rasguños',
        'Mordeduras',
      ]);

      break;
    }
    default: {
      console.log('default');
      break;
    }
  }
  patient.legalProceeding = faker.random.arrayElement<boolean>([false, true]);

  patient.motive = motive;
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
  patient.startDate = startDate;
  return patient;
});
