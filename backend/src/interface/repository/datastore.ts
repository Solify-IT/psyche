import Patient from 'domain/model';

export default interface IDatastore {
  get<T>(queryText: string, values?: any[]): Promise<T[]>;
  getById<T>(tablenName: string, id: string): Promise<T>;
  getOne<T>(queryText: string, values?: any[]): Promise<T>;
  getOneOrNull<T>(queryText: string, values?: any[]): Promise<T | null>;
  patients: {
    query(queryText?: string): Promise<Patient[]>;
  }
}
