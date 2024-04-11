import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import StudentComponentsPage from './student.page-object';
import StudentUpdatePage from './student-update.page-object';
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

describe('Student e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let studentComponentsPage: StudentComponentsPage;
  let studentUpdatePage: StudentUpdatePage;
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
    studentComponentsPage = new StudentComponentsPage();
    studentComponentsPage = await studentComponentsPage.goToPage(navBarPage);
  });

  it('should load Students', async () => {
    expect(await studentComponentsPage.title.getText()).to.match(/Students/);
    expect(await studentComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Students', async () => {
    const beforeRecordsCount = (await isVisible(studentComponentsPage.noRecords)) ? 0 : await getRecordsCount(studentComponentsPage.table);
    studentUpdatePage = await studentComponentsPage.goToCreateStudent();
    await studentUpdatePage.enterData();

    expect(await studentComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(studentComponentsPage.table);
    await waitUntilCount(studentComponentsPage.records, beforeRecordsCount + 1);
    expect(await studentComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await studentComponentsPage.deleteStudent();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(studentComponentsPage.records, beforeRecordsCount);
      expect(await studentComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(studentComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
