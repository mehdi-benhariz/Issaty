import { ITeacher } from 'app/shared/model/teacher.model';
import { IGroup } from 'app/shared/model/group.model';
import { Status } from 'app/shared/model/enumerations/status.model';
import { DocType } from 'app/shared/model/enumerations/doc-type.model';
import { FileType } from 'app/shared/model/enumerations/file-type.model';

export interface IDocument {
  id?: number;
  status?: Status | null;
  type?: DocType | null;
  file?: FileType | null;
  url?: string | null;
  owner?: ITeacher | null;
  toGroups?: IGroup[] | null;
  teacher?: ITeacher | null;
}

export const defaultValue: Readonly<IDocument> = {};
