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
