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
            payees: [
              {
                name: 'Timbers LTD',
                type: 'Business',
                sortCode: '34-45-00',
                accountNumber: '91908473',
                bankName: 'ORCA BANK PLC',
                reference: 'SN1039455900',
                lastPaidDate: '01 Jul 2023',
                lastPaidAmount: 499,
              },
              {
                name: 'Katica Zimman',
                type: 'Personal',
                sortCode: '02-43-24',
                accountNumber: '15932834',
                bankName: 'QUOTA BANK PLC',
                reference: 'S DOSIA',
                lastPaidDate: '18 Jun 2023',
                lastPaidAmount: 52.12,
              },
            ],
          },
          {
            bankAccountType: 'EDGE UP BANK ACCOUNT',
            sortCode: '01-02-03',
            accountNumber: '87654321',
            balance: 20000,
            balanceInclPending: 20000,
            payees: [],
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
                  date: 'Pending',
                  records: [
                    {
                      type: 'Out',
                      payeeOrPayer: 'TIMBERS LTD',
                      amount: 499,
                      date: '01 Jul 2023',
                      balance: 1385.67,
                      pending: true,
                      remark: 'TRANSFER TO TIMBERS LTD',
                    },
                    {
                      type: 'Out',
                      payeeOrPayer: 'AMAZON.CO.UK',
                      amount: 350,
                      date: '25 Jun 2023',
                      balance: 1884.67,
                      pending: true,
                      remark: 'FASTER PAYMENT TO AMAZON.CO.UK',
                    },
                  ],
                },
                {
                  date: '18 Jun 2023',
                  records: [
                    {
                      type: 'Out',
                      payeeOrPayer: 'TESCO STORES 2341',
                      amount: 32.43,
                      date: '18 Jun 2023',
                      balance: 2234.67,
                      pending: false,
                      remark: 'CARD PAYMENT TO TESCO STORES 2341',
                    },
                    {
                      type: 'Out',
                      payeeOrPayer: 'KATICA ZIMMAN',
                      amount: 52.12,
                      date: '18 Jun 2023',
                      balance: 2267.1,
                      pending: false,
                      remark: 'TRANSFER TO KATICA ZIMMAN',
                    },
                    {
                      type: 'Out',
                      payeeOrPayer: 'MCDONALDS',
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
                      payeeOrPayer: 'TESCO STORES 2341',
                      amount: 58.43,
                      date: '06 Jun 2023',
                      balance: 2331.54,
                      pending: false,
                      remark: 'CARD PAYMENT TO TESCO STORES 2341',
                    },
                    {
                      type: 'Out',
                      payeeOrPayer: 'KFC NO.135',
                      amount: 11.12,
                      date: '06 Jun 2023',
                      balance: 2369.97,
                      pending: false,
                      remark: 'CARD PAYMENT TO KFC NO.135',
                    },
                    {
                      type: 'Out',
                      payeeOrPayer: 'GOOGLE YOUTUBEPREMIUM',
                      amount: 11.99,
                      date: '06 Jun 2023',
                      balance: 2381.09,
                      pending: false,
                      remark: 'FASTER PAYMENT TO GOOGLE YOUTUBEPREMIUM',
                    },
                    {
                      type: 'Out',
                      payeeOrPayer: 'MCDONALDS',
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
                      payeeOrPayer: 'TESCO STORES 2341',
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
                      payeeOrPayer: 'KFC NO.135',
                      amount: 20.1,
                      date: '08 May 2023',
                      balance: 2479.9,
                      pending: false,
                      remark: 'CARD PAYMENT TO KFC NO.135',
                    },
                    {
                      type: 'In',
                      payeeOrPayer: 'ODO IRVIN',
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
                      payeeOrPayer: 'RESHMI RAY',
                      amount: 20000,
                      date: '16 Jun 2023',
                      balance: 20000,
                      pending: false,
                      remark: 'BANK TRANSFER TO RESHMI RAY',
                    },
                    {
                      type: 'In',
                      payeeOrPayer: 'BRENNUS YEN',
                      amount: 40000,
                      date: '16 Jun 2023',
                      balance: 40000,
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
                      payeeOrPayer: 'BRENNUS YEN',
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
                      payeeOrPayer: 'BRENNUS YEN',
                      amount: 40000,
                      date: '16 Jun 2023',
                      balance: 40000,
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
                  date: 'Pending',
                  records: [
                    {
                      type: 'Out',
                      payeeOrPayer: 'TIMBERS LTD',
                      amount: 499,
                      date: '01 Jul 2023',
                      balance: 1385.67,
                      pending: true,
                      remark: 'TRANSFER TO TIMBERS LTD',
                    },
                    {
                      type: 'Out',
                      payeeOrPayer: 'AMAZON.CO.UK',
                      amount: 350,
                      date: '25 Jun 2023',
                      balance: 1884.67,
                      pending: true,
                      remark: 'FASTER PAYMENT TO AMAZON.CO.UK',
                    },
                  ],
                },
                {
                  date: '18 Jun 2023',
                  records: [
                    {
                      type: 'Out',
                      payeeOrPayer: 'TESCO STORES 2341',
                      amount: 32.43,
                      date: '18 Jun 2023',
                      balance: 2234.67,
                      pending: false,
                      remark: 'CARD PAYMENT TO TESCO STORES 2341',
                    },
                    {
                      type: 'Out',
                      payeeOrPayer: 'KATICA ZIMMAN',
                      amount: 52.12,
                      date: '18 Jun 2023',
                      balance: 2267.1,
                      pending: false,
                      remark: 'TRANSFER TO KATICA ZIMMAN',
                    },
                    {
                      type: 'Out',
                      payeeOrPayer: 'MCDONALDS',
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
                      payeeOrPayer: 'TESCO STORES 2341',
                      amount: 58.43,
                      date: '06 Jun 2023',
                      balance: 2331.54,
                      pending: false,
                      remark: 'CARD PAYMENT TO TESCO STORES 2341',
                    },
                    {
                      type: 'Out',
                      payeeOrPayer: 'KFC NO.135',
                      amount: 11.12,
                      date: '06 Jun 2023',
                      balance: 2369.97,
                      pending: false,
                      remark: 'CARD PAYMENT TO KFC NO.135',
                    },
                    {
                      type: 'Out',
                      payeeOrPayer: 'GOOGLE YOUTUBEPREMIUM',
                      amount: 11.99,
                      date: '06 Jun 2023',
                      balance: 2381.09,
                      pending: false,
                      remark: 'FASTER PAYMENT TO GOOGLE YOUTUBEPREMIUM',
                    },
                    {
                      type: 'Out',
                      payeeOrPayer: 'MCDONALDS',
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
                      payeeOrPayer: 'TESCO STORES 2341',
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
                      payeeOrPayer: 'KFC NO.135',
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
                      payeeOrPayer: 'RESHMI RAY',
                      amount: 20000,
                      date: '16 Jun 2023',
                      balance: 20000,
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

    // Check a payee
    Mock.mock(new RegExp('/api/payee/check'), (params: MockParams) => {
      if (isLogon()) {
        const { name, type, sortCode, accountNumber } = JSON.parse(params.body);
        let incorrectSCAN = true; // sort code or account number
        let incorrectNameFlag = true;
        let incorrectTypeFlag = true;
        if (sortCode === '40-37-25' && accountNumber === '19304373') {
          incorrectSCAN = false;
          if (name.trim().toUpperCase() === 'DEXTER LOGISTICS') {
            incorrectNameFlag = false;
          }
          if (type === 'Business') {
            incorrectTypeFlag = false;
          }
        }
        if (sortCode === '30-90-89' && accountNumber === '20374916') {
          incorrectSCAN = false;
          if (name.trim().toUpperCase() === 'LIBRA INVESTMENTS') {
            incorrectNameFlag = false;
          }
          if (type === 'Business') {
            incorrectTypeFlag = false;
          }
        }
        if (sortCode === '23-05-80' && accountNumber === '36502859') {
          incorrectSCAN = false;
          if (name.trim().toUpperCase() === 'HAYDEN OAKLEY') {
            incorrectNameFlag = false;
          }
          if (type === 'Personal') {
            incorrectTypeFlag = false;
          }
        }
        if (sortCode === '58-20-41' && accountNumber === '51067729') {
          incorrectSCAN = false;
          if (name.trim().toUpperCase() === 'NEO GORDON') {
            incorrectNameFlag = false;
          }
          if (type === 'Personal') {
            incorrectTypeFlag = false;
          }
        }
        if (incorrectSCAN === true) {
          return successResponseWrap({
            status: 404,
            message: 'Incorrect SCAN.',
          });
        }
        if (
          incorrectSCAN === false &&
          incorrectNameFlag === true &&
          incorrectTypeFlag === false
        ) {
          return successResponseWrap({
            status: 404,
            message: 'Incorrect name.',
          });
        }
        if (
          incorrectSCAN === false &&
          incorrectNameFlag === false &&
          incorrectTypeFlag === true
        ) {
          return successResponseWrap({
            status: 404,
            message: 'Incorrect type.',
          });
        }
        if (
          incorrectSCAN === false &&
          incorrectNameFlag === true &&
          incorrectTypeFlag === true
        ) {
          return successResponseWrap({
            status: 404,
            message: 'Incorrect name and type.',
          });
        }
        if (
          incorrectSCAN === false &&
          incorrectNameFlag === false &&
          incorrectTypeFlag === false
        ) {
          return successResponseWrap({
            status: 200,
            message: 'Correct details.',
          });
        }
      }
      return failResponseWrap(null, 'You are not logged on.', 50008);
    });

    // Add a payee
    Mock.mock(new RegExp('/api/payee/add'), () => {
      if (isLogon()) {
        return successResponseWrap({
          status: 200,
          message: 'Successful operation.',
        });
      }
      return failResponseWrap(null, 'You are not logged on.', 50008);
    });

    // Delete a payee
    Mock.mock(new RegExp('/api/payee/delete'), () => {
      if (isLogon()) {
        return successResponseWrap({
          status: 200,
          message: 'Successful operation.',
        });
      }
      return failResponseWrap(null, 'You are not logged on.', 50008);
    });

    // Continue a payment
    Mock.mock(new RegExp('/api/payment/continue'), () => {
      if (isLogon()) {
        return successResponseWrap({
          status: 200,
          message: 'Successful operation.',
        });
      }
      return failResponseWrap(null, 'You are not logged on.', 50008);
    });

    // Authorise a payment
    Mock.mock(new RegExp('/api/payment/authorise'), () => {
      if (isLogon()) {
        return successResponseWrap({
          status: 200,
          message: 'Successful operation.',
        });
      }
      return failResponseWrap(null, 'You are not logged on.', 50008);
    });

    // Authorise a transfer
    Mock.mock(new RegExp('/api/transfer/authorise'), () => {
      if (isLogon()) {
        return successResponseWrap({
          status: 200,
          message: 'Successful operation.',
        });
      }
      return failResponseWrap(null, 'You are not logged on.', 50008);
    });
  },
});
