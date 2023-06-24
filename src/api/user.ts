import axios from 'axios';
import { UserState } from '@/store/modules/user/types';

export interface LogonData {
  personalID: string;
  securityNumber: string;
}

export interface LogonRes {
  token: string;
}

export function logon(data: LogonData) {
  return axios.post<LogonRes>('/api/user/logon', data);
}

export function logout() {
  return axios.post<LogonRes>('/api/user/logout');
}

export function getUserInfo() {
  return axios.post<UserState>('/api/user/info');
}
