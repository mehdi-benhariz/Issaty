import { IGroup } from 'app/shared/model/group.model';

export interface IMajor {
  id?: number;
  name?: string;
  description?: string | null;
  groups?: IGroup[] | null;
}

export const defaultValue: Readonly<IMajor> = {};
