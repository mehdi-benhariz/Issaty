import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import MajorUpdatePage from './major-update.page-object';

const expect = chai.expect;
export class MajorDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('issatyApp.major.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-major'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class MajorComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('major-heading'));
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
    await navBarPage.getEntityPage('major');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateMajor() {
    await this.createButton.click();
    return new MajorUpdatePage();
  }

  async deleteMajor() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const majorDeleteDialog = new MajorDeleteDialog();
    await waitUntilDisplayed(majorDeleteDialog.deleteModal);
    expect(await majorDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/issatyApp.major.delete.question/);
    await majorDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(majorDeleteDialog.deleteModal);

    expect(await isVisible(majorDeleteDialog.deleteModal)).to.be.false;
  }
}
