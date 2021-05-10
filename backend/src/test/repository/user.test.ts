import { User } from 'domain/model';
import PatientArea from 'domain/model/user/patientArea';
import Datastore from 'infraestructure/datastore/datastore';
import UserRepository from 'interface/repository/userRepository';
import testConnection from 'test/utils/testConnection';
import { getConnection } from 'typeorm';

beforeAll(async () => {
  await testConnection.create();
});

afterAll(async () => {
  await testConnection.close();
});

beforeEach(async () => {
  await testConnection.clear();
});
describe('User repository', () => {
  const datastore: Datastore = new Datastore();
  const userRepository : UserRepository = new UserRepository(datastore);
  const areas : PatientArea[] = [
    {
      name: 'Prueba',
      userId: 1,
    },
    {
      name: 'Prueba 2',
      userId: 1,
    },
  ];
  const user : User = {
    username: 'prueba',
    email: 'prueba',
    password: 'prueba',
    name: 'Nombre',
    role: 'Administrador',
    zipCode: 'abc',
    address: 'Direccion',
    active: true,
    professionalLicense: 'Licencia',
  };
  test('should register patient areas', async () => {
    const userResult = await getConnection().getRepository<User>(User).save(user);
    const result = await userRepository.registerProfile(areas);
    expect(result).toBeDefined();
    expect(result.length).toEqual(areas.length);
    expect(userResult.id).toEqual(result[0].userId);
  });
});
