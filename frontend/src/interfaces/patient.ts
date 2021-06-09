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
  birthDate: string;
  postalCode: number;
  motive: string;
  legalProceeding: boolean;
  status: boolean;
  abuseType: string;
  abuseFirstTime: string;
  abuseAttempts: string;
  abuseMotive: string;
  recordId: number,
  users?: any[],
}
