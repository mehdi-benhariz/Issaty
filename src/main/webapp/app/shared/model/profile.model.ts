import dayjs from 'dayjs';

export interface IProfile {
  id?: number;
  firstName?: string;
  lastName?: string;
  birthDate?: string | null;
  address?: string | null;
  profilePic?: string | null;
  email?: string | null;
}

export const defaultValue: Readonly<IProfile> = {};
