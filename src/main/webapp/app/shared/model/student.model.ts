import { IProfile } from 'app/shared/model/profile.model';
import { IUser } from 'app/shared/model/user.model';
import { IDemand } from 'app/shared/model/demand.model';
import { IGroup } from 'app/shared/model/group.model';

export interface IStudent {
  id?: number;
  profile?: IProfile | null;
  user?: IUser | null;
  demands?: IDemand[] | null;
  group?: IGroup | null;
}

export const defaultValue: Readonly<IStudent> = {};
