import { IDocument } from 'app/shared/model/document.model';
import { IStudent } from 'app/shared/model/student.model';
import { ISubject } from 'app/shared/model/subject.model';
import { IMajor } from 'app/shared/model/major.model';

export interface IGroup {
  id?: number;
  name?: string | null;
  emploi?: IDocument | null;
  students?: IStudent[] | null;
  subject?: ISubject | null;
  document?: IDocument | null;
  major?: IMajor | null;
}

export const defaultValue: Readonly<IGroup> = {};
