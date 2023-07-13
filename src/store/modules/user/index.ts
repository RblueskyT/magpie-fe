import { defineStore } from 'pinia';
import {
  LogonData,
  logon as userLogon,
  logout as userLogout,
} from '@/api/user';
import { setToken, clearToken, setGroup, clearGroup } from '@/utils/auth';
import { UserState } from './types';

const useUserStore = defineStore('user', {
  state: (): UserState => ({
    group: '',
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
        setGroup(res.data.group);
      } catch (err) {
        this.resetGroup();
        clearToken();
        clearGroup();
        throw err;
      }
    },
    logoutCallBack() {
      this.resetGroup();
      clearToken();
      clearGroup();
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
