import axios from 'axios';

export interface LogonData {
  personalID: string;
  securityNumber: string;
}

export interface LogonRes {
  token: string;
  group: string[];
}

export function logon(data: LogonData) {
  return axios.post<LogonRes>('/api/user/logon', data);
}

export function logout() {
  return axios.post<LogonRes>('/api/user/logout');
}
