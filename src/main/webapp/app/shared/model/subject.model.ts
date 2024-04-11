import { IGroup } from 'app/shared/model/group.model';
import { ITeacher } from 'app/shared/model/teacher.model';

export interface ISubject {
  id?: number;
  name?: string | null;
  groups?: IGroup[] | null;
  teacher?: ITeacher | null;
}

export const defaultValue: Readonly<ISubject> = {};
