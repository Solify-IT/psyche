import { createConnection, getConnection } from 'typeorm';
import ormconfigTest from './ormconfigTest';

const testConnection = {
  async create() {
    const connection = await createConnection(ormconfigTest);
    await connection.query('PRAGMA foreign_keys=OFF');
  },

  async close() {
    await getConnection().close();
  },

  async clear() {
    const connection = getConnection();
    const entities = connection.entityMetadatas;

    entities.forEach(async (entity) => {
      const repository = connection.getRepository(entity.name);
      await repository.query(`DELETE FROM ${entity.tableName}`);
    });
  },
};
export default testConnection;
