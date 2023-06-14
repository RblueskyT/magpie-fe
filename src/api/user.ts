import axios from 'axios';
import type { RouteRecordNormalized } from 'vue-router';
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

export function getMenuList() {
  return axios.post<RouteRecordNormalized[]>('/api/user/menu');
}
