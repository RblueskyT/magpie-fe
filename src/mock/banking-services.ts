import Mock from 'mockjs';
import setupMock, {
  successResponseWrap,
  failResponseWrap,
} from '@/utils/setup-mock';
import { MockParams } from '@/types/mock';
import { isLogon } from '@/utils/auth';

setupMock({
  setup() {
    // Mock.XHR.prototype.withCredentials = true; // Unused - this option is to solve a bug in some versions of Mock.js

    // Query bank accounts
    Mock.mock(new RegExp('/api/account/list'), () => {
      if (isLogon()) {
        return successResponseWrap([
          {
            bankAccountType: 'EVERYDAY BANK ACCOUNT',
            sortCode: '00-00-00',
            accountNumber: '12345678',
            balance: 2234.67,
            balanceInclPending: 1385.67,
          },
          {
            bankAccountType: 'BASIC BANK ACCOUNT',
            sortCode: '01-02-03',
            accountNumber: '87654321',
            balance: 2000,
            balanceInclPending: 2000,
          },
        ]);
      }
      return failResponseWrap(null, 'You are not logged on.', 50008);
    });

    // Query account records - all
    Mock.mock(new RegExp('/api/records/list_all'), (params: MockParams) => {
      if (isLogon()) {
        const { sortCode, accountNumber, page } = JSON.parse(params.body);
        if (sortCode === '00-00-00' && accountNumber === '12345678') {
          if (page === 1) {
            return successResponseWrap({
              dailyRecords: [
                {
                  date: '25 Jun 2023',
                  records: [
                    {
                      type: 'Out',
                      payee: 'AMAZON.CO.UK',
                      amount: 499,
                      date: '25 Jun 2023',
                      balance: 1385.67,
                      pending: true,
                      remark: 'FAST PAYMENT TO AMAZON.CO.UK',
                    },
                    {
                      type: 'Out',
                      payee: 'AMAZON.CO.UK',
                      amount: 350,
                      date: '25 Jun 2023',
                      balance: 1884.67,
                      pending: true,
                      remark: 'FAST PAYMENT TO AMAZON.CO.UK',
                    },
                  ],
                },
                {
                  date: '18 Jun 2023',
                  records: [
                    {
                      type: 'Out',
                      payee: 'TESCO STORES 2341',
                      amount: 32.43,
                      date: '18 Jun 2023',
                      balance: 2234.67,
                      pending: false,
                      remark: 'CARD PAYMENT TO TESCO STORES 2341',
                    },
                    {
                      type: 'Out',
                      payee: 'SAINSBURYS S/MKTS',
                      amount: 52.12,
                      date: '18 Jun 2023',
                      balance: 2267.1,
                      pending: false,
                      remark: 'CARD PAYMENT TO SAINSBURYS S/MKTS',
                    },
                    {
                      type: 'Out',
                      payee: 'MCDONALDS',
                      amount: 12.32,
                      date: '18 Jun 2023',
                      balance: 2319.22,
                      pending: false,
                      remark: 'CARD PAYMENT TO MCDONALDS',
                    },
                  ],
                },
                {
                  date: '06 Jun 2023',
                  records: [
                    {
                      type: 'Out',
                      payee: 'TESCO STORES 2341',
                      amount: 58.43,
                      date: '06 Jun 2023',
                      balance: 2331.54,
                      pending: false,
                      remark: 'CARD PAYMENT TO TESCO STORES 2341',
                    },
                    {
                      type: 'Out',
                      payee: 'KFC NO.135',
                      amount: 11.12,
                      date: '06 Jun 2023',
                      balance: 2369.97,
                      pending: false,
                      remark: 'CARD PAYMENT TO KFC NO.135',
                    },
                    {
                      type: 'Out',
                      payee: 'GOOGLE YOUTUBEPREMIUM',
                      amount: 11.99,
                      date: '06 Jun 2023',
                      balance: 2381.09,
                      pending: false,
                      remark: 'FAST PAYMENT TO GOOGLE YOUTUBEPREMIUM',
                    },
                    {
                      type: 'Out',
                      payee: 'MCDONALDS',
                      amount: 54.32,
                      date: '06 Jun 2023',
                      balance: 2393.08,
                      pending: false,
                      remark: 'CARD PAYMENT TO MCDONALDS',
                    },
                  ],
                },
                {
                  date: '25 May 2023',
                  records: [
                    {
                      type: 'Out',
                      payee: 'TESCO STORES 2341',
                      amount: 32.5,
                      date: '25 May 2023',
                      balance: 2447.4,
                      pending: false,
                      remark: 'CARD PAYMENT TO TESCO STORES 2341',
                    },
                  ],
                },
              ],
              currentPage: 1,
              totalPage: 2,
              totalNum: 12,
            });
          }
          if (page === 2) {
            return successResponseWrap({
              dailyRecords: [
                {
                  date: '08 May 2023',
                  records: [
                    {
                      type: 'Out',
                      payee: 'KFC NO.135',
                      amount: 20.1,
                      date: '08 May 2023',
                      balance: 2479.9,
                      pending: false,
                      remark: 'CARD PAYMENT TO KFC NO.135',
                    },
                    {
                      type: 'In',
                      payee: 'ODO IRVIN',
                      amount: 2500,
                      date: '08 May 2023',
                      balance: 2500,
                      pending: false,
                      remark: 'BANK TRANSFER FROM ODO IRVIN',
                    },
                  ],
                },
              ],
              currentPage: 2,
              totalPage: 2,
              totalNum: 12,
            });
          }
          return failResponseWrap(null, 'Incorrect page.', 50000);
        }
        if (sortCode === '01-02-03' && accountNumber === '87654321') {
          if (page === 1) {
            return successResponseWrap({
              dailyRecords: [
                {
                  date: '16 Jun 2023',
                  records: [
                    {
                      type: 'Out',
                      payee: 'RESHMI RAY',
                      amount: 2000,
                      date: '16 Jun 2023',
                      balance: 2000,
                      pending: false,
                      remark: 'BANK TRANSFER TO RESHMI RAY',
                    },
                    {
                      type: 'In',
                      payee: 'BRENNUS YEN',
                      amount: 4000,
                      date: '16 Jun 2023',
                      balance: 4000,
                      pending: false,
                      remark: 'BANK TRANSFER FROM BRENNUS YEN',
                    },
                  ],
                },
              ],
              currentPage: 1,
              totalPage: 1,
              totalNum: 2,
            });
          }
          return failResponseWrap(null, 'Incorrect page.', 50000);
        }
        return failResponseWrap(null, 'Unknown account.', 50000);
      }
      return failResponseWrap(null, 'You are not logged on.', 50008);
    });

    // Query account records - in
    Mock.mock(new RegExp('/api/records/list_in'), (params: MockParams) => {
      if (isLogon()) {
        const { sortCode, accountNumber, page } = JSON.parse(params.body);
        if (sortCode === '00-00-00' && accountNumber === '12345678') {
          if (page === 1) {
            return successResponseWrap({
              dailyRecords: [
                {
                  date: '16 Jun 2023',
                  records: [
                    {
                      type: 'In',
                      payee: 'BRENNUS YEN',
                      amount: 4000,
                      date: '16 Jun 2023',
                      balance: 4000,
                      pending: false,
                      remark: 'BANK TRANSFER FROM BRENNUS YEN',
                    },
                  ],
                },
              ],
              currentPage: 1,
              totalPage: 1,
              totalNum: 1,
            });
          }
          return failResponseWrap(null, 'Incorrect page.', 50000);
        }
        if (sortCode === '01-02-03' && accountNumber === '87654321') {
          if (page === 1) {
            return successResponseWrap({
              dailyRecords: [
                {
                  date: '16 Jun 2023',
                  records: [
                    {
                      type: 'In',
                      payee: 'BRENNUS YEN',
                      amount: 4000,
                      date: '16 Jun 2023',
                      balance: 4000,
                      pending: false,
                      remark: 'BANK TRANSFER FROM BRENNUS YEN',
                    },
                  ],
                },
              ],
              currentPage: 1,
              totalPage: 1,
              totalNum: 1,
            });
          }
          return failResponseWrap(null, 'Incorrect page.', 50000);
        }
        return failResponseWrap(null, 'Unknown account.', 50000);
      }
      return failResponseWrap(null, 'You are not logged on.', 50008);
    });

    // Query account records - out
    Mock.mock(new RegExp('/api/records/list_out'), (params: MockParams) => {
      if (isLogon()) {
        const { sortCode, accountNumber, page } = JSON.parse(params.body);
        if (sortCode === '00-00-00' && accountNumber === '12345678') {
          if (page === 1) {
            return successResponseWrap({
              dailyRecords: [
                {
                  date: '25 Jun 2023',
                  records: [
                    {
                      type: 'Out',
                      payee: 'AMAZON.CO.UK',
                      amount: 499,
                      date: '25 Jun 2023',
                      balance: 1385.67,
                      pending: true,
                      remark: 'FAST PAYMENT TO AMAZON.CO.UK',
                    },
                    {
                      type: 'Out',
                      payee: 'AMAZON.CO.UK',
                      amount: 350,
                      date: '25 Jun 2023',
                      balance: 1884.67,
                      pending: true,
                      remark: 'FAST PAYMENT TO AMAZON.CO.UK',
                    },
                  ],
                },
                {
                  date: '18 Jun 2023',
                  records: [
                    {
                      type: 'Out',
                      payee: 'TESCO STORES 2341',
                      amount: 32.43,
                      date: '18 Jun 2023',
                      balance: 2234.67,
                      pending: false,
                      remark: 'CARD PAYMENT TO TESCO STORES 2341',
                    },
                    {
                      type: 'Out',
                      payee: 'SAINSBURYS S/MKTS',
                      amount: 52.12,
                      date: '18 Jun 2023',
                      balance: 2267.1,
                      pending: false,
                      remark: 'CARD PAYMENT TO SAINSBURYS S/MKTS',
                    },
                    {
                      type: 'Out',
                      payee: 'MCDONALDS',
                      amount: 12.32,
                      date: '18 Jun 2023',
                      balance: 2319.22,
                      pending: false,
                      remark: 'CARD PAYMENT TO MCDONALDS',
                    },
                  ],
                },
                {
                  date: '06 Jun 2023',
                  records: [
                    {
                      type: 'Out',
                      payee: 'TESCO STORES 2341',
                      amount: 58.43,
                      date: '06 Jun 2023',
                      balance: 2331.54,
                      pending: false,
                      remark: 'CARD PAYMENT TO TESCO STORES 2341',
                    },
                    {
                      type: 'Out',
                      payee: 'KFC NO.135',
                      amount: 11.12,
                      date: '06 Jun 2023',
                      balance: 2369.97,
                      pending: false,
                      remark: 'CARD PAYMENT TO KFC NO.135',
                    },
                    {
                      type: 'Out',
                      payee: 'GOOGLE YOUTUBEPREMIUM',
                      amount: 11.99,
                      date: '06 Jun 2023',
                      balance: 2381.09,
                      pending: false,
                      remark: 'FAST PAYMENT TO GOOGLE YOUTUBEPREMIUM',
                    },
                    {
                      type: 'Out',
                      payee: 'MCDONALDS',
                      amount: 54.32,
                      date: '06 Jun 2023',
                      balance: 2393.08,
                      pending: false,
                      remark: 'CARD PAYMENT TO MCDONALDS',
                    },
                  ],
                },
                {
                  date: '25 May 2023',
                  records: [
                    {
                      type: 'Out',
                      payee: 'TESCO STORES 2341',
                      amount: 32.5,
                      date: '25 May 2023',
                      balance: 2447.4,
                      pending: false,
                      remark: 'CARD PAYMENT TO TESCO STORES 2341',
                    },
                  ],
                },
              ],
              currentPage: 1,
              totalPage: 2,
              totalNum: 11,
            });
          }
          if (page === 2) {
            return successResponseWrap({
              dailyRecords: [
                {
                  date: '08 May 2023',
                  records: [
                    {
                      type: 'Out',
                      payee: 'KFC NO.135',
                      amount: 20.1,
                      date: '08 May 2023',
                      balance: 2479.9,
                      pending: false,
                      remark: 'CARD PAYMENT TO KFC NO.135',
                    },
                  ],
                },
              ],
              currentPage: 2,
              totalPage: 2,
              totalNum: 11,
            });
          }
          return failResponseWrap(null, 'Incorrect page.', 50000);
        }
        if (sortCode === '01-02-03' && accountNumber === '87654321') {
          if (page === 1) {
            return successResponseWrap({
              dailyRecords: [
                {
                  date: '16 Jun 2023',
                  records: [
                    {
                      type: 'Out',
                      payee: 'RESHMI RAY',
                      amount: 2000,
                      date: '16 Jun 2023',
                      balance: 2000,
                      pending: false,
                      remark: 'BANK TRANSFER TO RESHMI RAY',
                    },
                  ],
                },
              ],
              currentPage: 1,
              totalPage: 1,
              totalNum: 1,
            });
          }
          return failResponseWrap(null, 'Incorrect page.', 50000);
        }
        return failResponseWrap(null, 'Unknown account.', 50000);
      }
      return failResponseWrap(null, 'You are not logged on.', 50008);
    });

    // Query Payee List
    Mock.mock(new RegExp('/api/payee/list'), () => {
      if (isLogon()) {
        return successResponseWrap([
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
        ]);
      }
      return failResponseWrap(null, 'You are not logged on.', 50008);
    });
  },
});
