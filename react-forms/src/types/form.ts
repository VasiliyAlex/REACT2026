export interface Submission {
  id: string;
  type: 'uncontrolled' | 'rhf';
  name: string;
  age: number;
  email: string;
  gender: string;
  country: string;
  image: string;
  createdAt: number;
}