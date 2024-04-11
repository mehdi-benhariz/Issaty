import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import profile, {
  ProfileState
} from 'app/entities/profile/profile.reducer';
// prettier-ignore
import teacher, {
  TeacherState
} from 'app/entities/teacher/teacher.reducer';
// prettier-ignore
import department, {
  DepartmentState
} from 'app/entities/department/department.reducer';
// prettier-ignore
import subject, {
  SubjectState
} from 'app/entities/subject/subject.reducer';
// prettier-ignore
import group, {
  GroupState
} from 'app/entities/group/group.reducer';
// prettier-ignore
import student, {
  StudentState
} from 'app/entities/student/student.reducer';
// prettier-ignore
import admin, {
  AdminState
} from 'app/entities/admin/admin.reducer';
// prettier-ignore
import demand, {
  DemandState
} from 'app/entities/demand/demand.reducer';
// prettier-ignore
import document, {
  DocumentState
} from 'app/entities/document/document.reducer';
// prettier-ignore
import major, {
  MajorState
} from 'app/entities/major/major.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly locale: LocaleState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly profile: ProfileState;
  readonly teacher: TeacherState;
  readonly department: DepartmentState;
  readonly subject: SubjectState;
  readonly group: GroupState;
  readonly student: StudentState;
  readonly admin: AdminState;
  readonly demand: DemandState;
  readonly document: DocumentState;
  readonly major: MajorState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  profile,
  teacher,
  department,
  subject,
  group,
  student,
  admin,
  demand,
  document,
  major,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar,
});

export default rootReducer;
