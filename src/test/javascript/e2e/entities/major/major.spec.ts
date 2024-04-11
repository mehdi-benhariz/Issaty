import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import MajorComponentsPage from './major.page-object';
import MajorUpdatePage from './major-update.page-object';
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

describe('Major e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let majorComponentsPage: MajorComponentsPage;
  let majorUpdatePage: MajorUpdatePage;
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
    majorComponentsPage = new MajorComponentsPage();
    majorComponentsPage = await majorComponentsPage.goToPage(navBarPage);
  });

  it('should load Majors', async () => {
    expect(await majorComponentsPage.title.getText()).to.match(/Majors/);
    expect(await majorComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Majors', async () => {
    const beforeRecordsCount = (await isVisible(majorComponentsPage.noRecords)) ? 0 : await getRecordsCount(majorComponentsPage.table);
    majorUpdatePage = await majorComponentsPage.goToCreateMajor();
    await majorUpdatePage.enterData();

    expect(await majorComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(majorComponentsPage.table);
    await waitUntilCount(majorComponentsPage.records, beforeRecordsCount + 1);
    expect(await majorComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await majorComponentsPage.deleteMajor();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(majorComponentsPage.records, beforeRecordsCount);
      expect(await majorComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(majorComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
