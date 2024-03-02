import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import DocumentComponentsPage from './document.page-object';
import DocumentUpdatePage from './document-update.page-object';
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

describe('Document e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let documentComponentsPage: DocumentComponentsPage;
  let documentUpdatePage: DocumentUpdatePage;
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
    documentComponentsPage = new DocumentComponentsPage();
    documentComponentsPage = await documentComponentsPage.goToPage(navBarPage);
  });

  it('should load Documents', async () => {
    expect(await documentComponentsPage.title.getText()).to.match(/Documents/);
    expect(await documentComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Documents', async () => {
    const beforeRecordsCount = (await isVisible(documentComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(documentComponentsPage.table);
    documentUpdatePage = await documentComponentsPage.goToCreateDocument();
    await documentUpdatePage.enterData();

    expect(await documentComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(documentComponentsPage.table);
    await waitUntilCount(documentComponentsPage.records, beforeRecordsCount + 1);
    expect(await documentComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await documentComponentsPage.deleteDocument();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(documentComponentsPage.records, beforeRecordsCount);
      expect(await documentComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(documentComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
