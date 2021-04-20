export default interface Patient {
  id: number;
  name: string;
  type: string;
  costPerSession: number;
  age: number;
  startDate: Date;
  gender: string;
  telephone: string;
  address: string;
  civilStatus: string;
  notes: string;
}
