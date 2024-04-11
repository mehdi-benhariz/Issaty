import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import DemandComponentsPage from './demand.page-object';
import DemandUpdatePage from './demand-update.page-object';
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

describe('Demand e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let demandComponentsPage: DemandComponentsPage;
  let demandUpdatePage: DemandUpdatePage;
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
    demandComponentsPage = new DemandComponentsPage();
    demandComponentsPage = await demandComponentsPage.goToPage(navBarPage);
  });

  it('should load Demands', async () => {
    expect(await demandComponentsPage.title.getText()).to.match(/Demands/);
    expect(await demandComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Demands', async () => {
    const beforeRecordsCount = (await isVisible(demandComponentsPage.noRecords)) ? 0 : await getRecordsCount(demandComponentsPage.table);
    demandUpdatePage = await demandComponentsPage.goToCreateDemand();
    await demandUpdatePage.enterData();

    expect(await demandComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(demandComponentsPage.table);
    await waitUntilCount(demandComponentsPage.records, beforeRecordsCount + 1);
    expect(await demandComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await demandComponentsPage.deleteDemand();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(demandComponentsPage.records, beforeRecordsCount);
      expect(await demandComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(demandComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
