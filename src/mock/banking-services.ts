import Mock from 'mockjs';
import setupMock, {
  successResponseWrap,
  failResponseWrap,
} from '@/utils/setup-mock';
// import { MockParams } from '@/types/mock';
import { isLogon } from '@/utils/auth';

setupMock({
  setup() {
    // Mock.XHR.prototype.withCredentials = true; // Unused - this option is to solve a bug in some versions of Mock.js

    // Query bank accounts
    Mock.mock(new RegExp('/api/account/list'), () => {
      if (isLogon()) {
        return successResponseWrap({
          bankAccounts: [
            {
              bankAccountType: 'BASIC BANK ACCOUNT',
              sortCode: '00-00-00',
              accountNumber: '12345678',
              balance: 2370,
              balanceInclPending: 1000.35,
            },
            {
              bankAccountType: 'EVERYDAY BANK ACCOUNT',
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

    // Query Payee List
    Mock.mock(new RegExp('/api/payee/list'), () => {
      if (isLogon()) {
        return successResponseWrap({
          payees: [
            {
              name: 'Katica Zimman',
              type: 'Personal',
              sortCode: '02-43-24',
              accountNumber: '15932834',
              reference: 'service charge',
            },
            {
              name: 'Timbers LTD',
              type: 'Business',
              sortCode: '34-45-00',
              accountNumber: '91908473',
              reference: 'SN1039455900',
            },
          ],
        });
      }
      return failResponseWrap(null, 'not logged on', 50008);
    });
  },
});
