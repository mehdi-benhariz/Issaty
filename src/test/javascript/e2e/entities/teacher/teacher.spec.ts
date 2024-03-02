import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import TeacherComponentsPage from './teacher.page-object';
import TeacherUpdatePage from './teacher-update.page-object';
import {
  waitUntilDisplayed,
  waitUntilAnyDisplayed,
  click,
  getRecordsCount,
  waitUntilHidden,
  waitUntilCount,
  isVisible,
} from '../../util/utils';

const expect = chai.expect;

describe('Teacher e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let teacherComponentsPage: TeacherComponentsPage;
  let teacherUpdatePage: TeacherUpdatePage;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.waitUntilDisplayed();
    await signInPage.username.sendKeys(username);
    await signInPage.password.sendKeys(password);
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();
    await waitUntilDisplayed(navBarPage.entityMenu);
    await waitUntilDisplayed(navBarPage.adminMenu);
    await waitUntilDisplayed(navBarPage.accountMenu);
  });

  beforeEach(async () => {
    await browser.get('/');
    await waitUntilDisplayed(navBarPage.entityMenu);
    teacherComponentsPage = new TeacherComponentsPage();
    teacherComponentsPage = await teacherComponentsPage.goToPage(navBarPage);
  });

  it('should load Teachers', async () => {
    expect(await teacherComponentsPage.title.getText()).to.match(/Teachers/);
    expect(await teacherComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Teachers', async () => {
    const beforeRecordsCount = (await isVisible(teacherComponentsPage.noRecords)) ? 0 : await getRecordsCount(teacherComponentsPage.table);
    teacherUpdatePage = await teacherComponentsPage.goToCreateTeacher();
    await teacherUpdatePage.enterData();

    expect(await teacherComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(teacherComponentsPage.table);
    await waitUntilCount(teacherComponentsPage.records, beforeRecordsCount + 1);
    expect(await teacherComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await teacherComponentsPage.deleteTeacher();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(teacherComponentsPage.records, beforeRecordsCount);
      expect(await teacherComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(teacherComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
