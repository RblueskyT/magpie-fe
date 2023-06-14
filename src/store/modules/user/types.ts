export type RoleType = '' | '*' | 'admin' | 'user';
export type AccountType = 0 | 1 | 2 | 3;
export interface UserState {
  // TODO: NEED TO BE MODIFIED
  name?: string;
  avatar?: string;
  job?: string;
  organization?: string;
  location?: string;
  email?: string;
  introduction?: string;
  personalWebsite?: string;
  jobName?: string;
  organizationName?: string;
  locationName?: string;
  phone?: string;
  registrationDate?: string;
  accountId?: string;
  certification?: number;
  role: RoleType;
  // New Types
  accountType?: AccountType;
}
