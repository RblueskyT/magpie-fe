import Mock from 'mockjs';
import setupMock, {
  successResponseWrap,
  failResponseWrap,
} from '@/utils/setup-mock';

import { MockParams } from '@/types/mock';
import { isLogon } from '@/utils/auth';

setupMock({
  setup() {
    // Mock.XHR.prototype.withCredentials = true;

    // User Info
    Mock.mock(new RegExp('/api/user/info'), () => {
      if (isLogon()) {
        return successResponseWrap({
          group: 1,
          bankAccounts: [
            {
              bankAccountType: 'BASIC BANK ACCOUNT',
              sortCode: '00-00-00',
              accountNumber: '12345678',
              balance: 2370.31,
              balanceInclPending: 1000.35,
            },
            {
              bankAccountType: 'BASIC TOP-UP DEBIT CARD',
              sortCode: '01-02-03',
              accountNumber: '87654321',
              balance: 3870.62,
              balanceInclPending: 1702.93,
            },
          ],
        });
      }
      return failResponseWrap(null, 'not logged on', 50008);
    });

    // User Logon
    Mock.mock(new RegExp('/api/user/logon'), (params: MockParams) => {
      const { personalID, securityNumber } = JSON.parse(params.body);
      if (!personalID) {
        return failResponseWrap(null, 'Personal ID cannot be empty', 50000);
      }
      if (!securityNumber) {
        return failResponseWrap(null, 'Security number cannot be empty', 50000);
      }
      if (personalID === '1234567890' && securityNumber === '12345') {
        return successResponseWrap({
          token: '12345',
        });
      }
      return failResponseWrap(
        null,
        'Incorrect personal ID or security number',
        50000
      );
    });

    // User Logout
    Mock.mock(new RegExp('/api/user/logout'), () => {
      return successResponseWrap(null);
    });
  },
});
