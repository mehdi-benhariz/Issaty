import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import DemandUpdatePage from './demand-update.page-object';

const expect = chai.expect;
export class DemandDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('issatyApp.demand.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-demand'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class DemandComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('demand-heading'));
  noRecords: ElementFinder = element(by.css('#app-view-container .table-responsive div.alert.alert-warning'));
  table: ElementFinder = element(by.css('#app-view-container div.table-responsive > table'));

  records: ElementArrayFinder = this.table.all(by.css('tbody tr'));

  getDetailsButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-info.btn-sm'));
  }

  getEditButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-primary.btn-sm'));
  }

  getDeleteButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-danger.btn-sm'));
  }

  async goToPage(navBarPage: NavBarPage) {
    await navBarPage.getEntityPage('demand');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateDemand() {
    await this.createButton.click();
    return new DemandUpdatePage();
  }

  async deleteDemand() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const demandDeleteDialog = new DemandDeleteDialog();
    await waitUntilDisplayed(demandDeleteDialog.deleteModal);
    expect(await demandDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/issatyApp.demand.delete.question/);
    await demandDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(demandDeleteDialog.deleteModal);

    expect(await isVisible(demandDeleteDialog.deleteModal)).to.be.false;
  }
}
