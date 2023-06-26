import axios from 'axios';

export interface BankAccountProps {
  bankAccountType: string;
  sortCode: string;
  accountNumber: string;
  balance: number;
  balanceInclPending: number;
}

export interface PayeeProps {
  name: string;
  type: 'Personal' | 'Business';
  sortCode: string;
  accountNumber: string;
  reference: string;
}

export function queryAccountList() {
  return axios.post<BankAccountProps[]>('/api/account/list');
}

export function queryPayeeList() {
  return axios.post<PayeeProps[]>('/api/payee/list');
}
