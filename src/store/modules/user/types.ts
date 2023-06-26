export type GroupNumber = 0 | 1 | 2 | 3 | 4;

export interface UserState {
  group?: GroupNumber; // Group number used in the controlled experiment
}
