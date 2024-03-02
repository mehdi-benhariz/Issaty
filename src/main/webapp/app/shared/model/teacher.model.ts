import { IProfile } from 'app/shared/model/profile.model';
import { IUser } from 'app/shared/model/user.model';
import { IDepartment } from 'app/shared/model/department.model';
import { ISubject } from 'app/shared/model/subject.model';
import { Grade } from 'app/shared/model/enumerations/grade.model';

export interface ITeacher {
  id?: number;
  grade?: Grade | null;
  isChef?: boolean | null;
  bureau?: string | null;
  profile?: IProfile | null;
  user?: IUser | null;
  chefOfDepartment?: IDepartment | null;
  subjects?: ISubject[] | null;
}

export const defaultValue: Readonly<ITeacher> = {
  isChef: false,
};
