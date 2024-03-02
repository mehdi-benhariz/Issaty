import { IStudent } from 'app/shared/model/student.model';
import { Status } from 'app/shared/model/enumerations/status.model';

export interface IDemand {
  id?: number;
  status?: Status | null;
  student?: IStudent | null;
}

export const defaultValue: Readonly<IDemand> = {};
