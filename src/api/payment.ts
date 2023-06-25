import axios from 'axios';

export interface PayeeProps {
  name: string;
  type: 'Personal' | 'Business';
  sortCode: string;
  accountNumber: string;
  reference: string;
}

export function queryPayeeList() {
  return axios.post<PayeeProps[]>('/api/payee/list');
}
