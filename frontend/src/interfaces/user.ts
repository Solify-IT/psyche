export default interface User {
  id?: number;
  username: string;
  name: string;
  address: string;
  telephone: string;
  zipCode: string;
  password: string;
  email: string;
  role: string;
  professionalLicense: string;
  workSchedule: string;
  password2: string;
  errors: {
    password: string,
    username: string,
    email: string,
  };
}
