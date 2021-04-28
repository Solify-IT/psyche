export default interface Patient {
  id?: number;
  name: string;
  lastName: string;
  startDate: Date;
  type: string;
  gender: string;
  telephone: string;
  address: string;
  birthPlace: string;
  birthDate: Date;
  postalCode: number;
  area: string;
  recordId: number,
}
