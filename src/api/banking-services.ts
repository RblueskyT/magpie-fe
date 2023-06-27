import axios from 'axios';

export interface BankAccountProps {
  bankAccountType: string;
  sortCode: string;
  accountNumber: string;
  balance: number;
  balanceInclPending: number;
}

export interface BillingRecordsQueryData {
  sortCode: string;
  accountNumber: string;
  page: number;
}

export interface SingleBillingRecordProps {
  type: 'In' | 'Out';
  payee: string;
  amount: number;
  date: string;
  balance: number;
  pending: boolean;
  remark: string;
}

export interface DailyBillingRecordsProps {
  date: string;
  records: SingleBillingRecordProps[];
}

export interface AllBillingRecordsProps {
  dailyRecords: DailyBillingRecordsProps[];
  currentPage: number;
  totalPage: number;
  totalNum: number;
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

export function queryBillingRecordListAll(data: BillingRecordsQueryData) {
  return axios.post<AllBillingRecordsProps>('/api/records/list_all', data);
}

export function queryBillingRecordListIn(data: BillingRecordsQueryData) {
  return axios.post<AllBillingRecordsProps>('/api/records/list_in', data);
}

export function queryBillingRecordListOut(data: BillingRecordsQueryData) {
  return axios.post<AllBillingRecordsProps>('/api/records/list_out', data);
}

export function queryPayeeList() {
  return axios.post<PayeeProps[]>('/api/payee/list');
}
