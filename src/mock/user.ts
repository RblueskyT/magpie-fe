import Mock from 'mockjs';
import setupMock, {
  successResponseWrap,
  failResponseWrap,
} from '@/utils/setup-mock';
import { MockParams } from '@/types/mock';
import getARandomWarningSet from '@/utils/random-warning';

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
      if (personalID === '1234567890' && securityNumber === '12340') {
        return successResponseWrap({
          token: '12340',
          group: getARandomWarningSet(1),
        });
      }
      if (personalID === '1234567891' && securityNumber === '12341') {
        return successResponseWrap({
          token: '12341',
          group: getARandomWarningSet(2),
        });
      }
      if (personalID === '1234567892' && securityNumber === '12342') {
        return successResponseWrap({
          token: '12342',
          group: getARandomWarningSet(3),
        });
      }
      if (personalID === '1234567893' && securityNumber === '12343') {
        return successResponseWrap({
          token: '12343',
          group: getARandomWarningSet(4),
        });
      }
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
