export default interface User {
  username: string;
  name: string;
  address: string;
  telephone: string;
  zipCode: string;
  password: string;
  email: string;
  role: string;
  password2: string;
  errors: {
    password: string,
    username: string,
  };
}
