export interface Leave {
  id: string | null;
  employeeFirstName: string;
  employeeLastName: string;
  typeId: string | null;
  type?: LeaveType | null;
  date: string | null;
}

export interface LeaveType {
  id: string;
  description: string;
}

export interface State {
  loading: boolean;
  leaves: Leave[];
  leaveTypes: LeaveType[];
}
