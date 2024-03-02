import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import GroupComponentsPage from './group.page-object';
import GroupUpdatePage from './group-update.page-object';
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

describe('Group e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let groupComponentsPage: GroupComponentsPage;
  let groupUpdatePage: GroupUpdatePage;
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
    groupComponentsPage = new GroupComponentsPage();
    groupComponentsPage = await groupComponentsPage.goToPage(navBarPage);
  });

  it('should load Groups', async () => {
    expect(await groupComponentsPage.title.getText()).to.match(/Groups/);
    expect(await groupComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Groups', async () => {
    const beforeRecordsCount = (await isVisible(groupComponentsPage.noRecords)) ? 0 : await getRecordsCount(groupComponentsPage.table);
    groupUpdatePage = await groupComponentsPage.goToCreateGroup();
    await groupUpdatePage.enterData();

    expect(await groupComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(groupComponentsPage.table);
    await waitUntilCount(groupComponentsPage.records, beforeRecordsCount + 1);
    expect(await groupComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await groupComponentsPage.deleteGroup();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(groupComponentsPage.records, beforeRecordsCount);
      expect(await groupComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(groupComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
