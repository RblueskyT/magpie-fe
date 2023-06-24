import { defineStore } from 'pinia';
import {
  LogonData,
  logon as userLogon,
  logout as userLogout,
  getUserInfo,
} from '@/api/user';
import { setToken, clearToken } from '@/utils/auth';
import { UserState } from './types';

const useUserStore = defineStore('user', {
  state: (): UserState => ({
    group: 0,
    bankAccounts: [],
  }),

  getters: {
    userInfo(state: UserState): UserState {
      return { ...state };
    },
  },

  actions: {
    // Set user's information
    setInfo(partial: Partial<UserState>) {
      this.$patch(partial);
    },

    // Reset user's information
    resetInfo() {
      this.$reset();
    },

    // Get user's information
    async info() {
      const res = await getUserInfo();

      this.setInfo(res.data);
    },

    // Logon
    async logon(logonForm: LogonData) {
      try {
        const res = await userLogon(logonForm);
        setToken(res.data.token);
      } catch (err) {
        clearToken();
        throw err;
      }
    },
    logoutCallBack() {
      this.resetInfo();
      clearToken();
    },
    // Logout
    async logout() {
      try {
        await userLogout();
      } finally {
        this.logoutCallBack();
      }
    },
  },
});

export default useUserStore;
