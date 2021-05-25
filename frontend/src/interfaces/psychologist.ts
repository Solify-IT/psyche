export default interface Psychologist {
  id?:number,
  username: string;
  name: string;
  address: string;
  telephone: string;
  zipCode: string;
  password: string;
  email: string;
  role: string;
  patientAreas: Array<any>,
}
