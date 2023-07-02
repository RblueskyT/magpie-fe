import Mock from 'mockjs';
import setupMock, {
  successResponseWrap,
  failResponseWrap,
} from '@/utils/setup-mock';
import { MockParams } from '@/types/mock';

setupMock({
  setup() {
    // Mock.XHR.prototype.withCredentials = true; // Unused - this option is to solve a bug in some versions of Mock.js

    // User Logon
    Mock.mock(new RegExp('/api/user/logon'), (params: MockParams) => {
      const { personalID, securityNumber } = JSON.parse(params.body);
      if (!personalID) {
        return failResponseWrap(null, 'Personal ID cannot be empty.', 50000);
      }
      if (!securityNumber) {
        return failResponseWrap(
          null,
          'Security number cannot be empty.',
          50000
        );
      }
      if (personalID === '1234567890' && securityNumber === '12345') {
        return successResponseWrap({
          token: '12345',
          group: 1,
        });
      }
      // TODO: other test accounts
      return failResponseWrap(
        null,
        'Incorrect personal ID or security number.',
        50000
      );
    });

    // User Logout
    Mock.mock(new RegExp('/api/user/logout'), () => {
      return successResponseWrap(null);
    });
  },
});
