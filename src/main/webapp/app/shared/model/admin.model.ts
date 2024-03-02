import { IProfile } from 'app/shared/model/profile.model';
import { IUser } from 'app/shared/model/user.model';
import { AdminRole } from 'app/shared/model/enumerations/admin-role.model';

export interface IAdmin {
  id?: number;
  isSuper?: boolean | null;
  role?: AdminRole | null;
  profile?: IProfile | null;
  user?: IUser | null;
}

export const defaultValue: Readonly<IAdmin> = {
  isSuper: false,
};
