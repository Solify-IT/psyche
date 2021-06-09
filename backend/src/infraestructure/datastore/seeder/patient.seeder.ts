/* eslint-disable no-await-in-loop */
import { Patient } from 'domain/model';
import Record from 'domain/model/record';
import { Factory, Seeder } from 'typeorm-seeding';

const areas = [
  'Psicología Menor de Edad',
  'Psicología Adulto',
  'Psicología Familia',
  'Psicología Pareja',
  'Psiquiatría Menor de Edad',
  'Psiquiatría Adulto',
  'Clínica',
  'Forense',
  'Asesoría Jurídica Menor de Edad',
  'Asesoría Jurídica Adulto',
];

export default class CreatePatients implements Seeder {
  public async run(factory: Factory): Promise<any> {
    const amount = 100;
    for (let i = 0; i < amount; i += 1) {
      const record = await factory(Record)().create();
      const random = Math.floor(Math.random() * areas.length);
      const randomArea = areas[random];
      let numPatients;
      switch (randomArea) {
        case areas[2]:
          numPatients = 4;
          break;
        case areas[3]:
          numPatients = 2;
          break;
        default:
          numPatients = 1;
          break;
      }
      await factory(Patient)({ recordId: record.id, type: randomArea }).createMany(numPatients);
    }
    console.log('\n\nRecord and patients created! :)\n\n');
  }
}
