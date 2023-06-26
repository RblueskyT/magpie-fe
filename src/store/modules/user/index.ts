import { defineStore } from 'pinia';
import {
  LogonData,
  logon as userLogon,
  logout as userLogout,
} from '@/api/user';
import { setToken, clearToken } from '@/utils/auth';
import { UserState } from './types';

const useUserStore = defineStore('user', {
  state: (): UserState => ({
    group: 0,
  }),

  getters: {
    userGroup(state: UserState): UserState {
      return { ...state };
    },
  },

  actions: {
    // Set user's group
    setGroup(partial: Partial<UserState>) {
      this.$patch(partial);
    },

    // Reset user's group
    resetGroup() {
      this.$reset();
    },

    // Logon
    async logon(logonForm: LogonData) {
      try {
        const res = await userLogon(logonForm);
        this.setGroup({ group: res.data.group });
        setToken(res.data.token);
      } catch (err) {
        this.resetGroup();
        clearToken();
        throw err;
      }
    },
    logoutCallBack() {
      this.resetGroup();
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
