export type GroupNumber = 0 | 1 | 2 | 3 | 4;

export interface BankAccountProps {
  bankAccountType: string;
  sortCode: string;
  accountNumber: string;
  balance: number;
  balanceInclPending: number;
}

export interface UserState {
  group?: GroupNumber; // Group number used in the controlled experiment
  bankAccounts?: BankAccountProps[]; // Mock bank accounts
}
