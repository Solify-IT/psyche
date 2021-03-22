import { wrapError } from 'src/@types';
import { Patient } from 'src/domain/model';
import { IDatastore } from 'src/interface/repository';

export default class Datastore implements IDatastore {
    get<T>(queryText: string, values?: any[]): Promise<T[]> {
      throw new Error('Method not implemented.');
    }
  
    getById<T>(tablenName: string, id: string): Promise<T> {
      throw new Error('Method not implemented.');
    }
  
    getOne<T>(queryText: string, values?: any[]): Promise<T> {
      throw new Error('Method not implemented.');
    }
  
    getOneOrNull<T>(queryText: string, values?: any[]): Promise<T> {
      throw new Error('Method not implemented.');
    }
  
    patients: {
      query(queryText?: string): Promise<Patient[]>;
    };
  
    constructor() {
  
      const query = async (): Promise<Patient[]> => {

        const patients: Patient[] = [];

        //TODO: Remove hardcoded value and communicate with database
        patients.push({
            name: 'Test'
        });

        return patients;
      };
  
    this.patients = { query };
    
    }
  }