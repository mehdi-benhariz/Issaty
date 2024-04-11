import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import DocumentUpdatePage from './document-update.page-object';

const expect = chai.expect;
export class DocumentDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('issatyApp.document.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-document'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class DocumentComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('document-heading'));
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
    await navBarPage.getEntityPage('document');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateDocument() {
    await this.createButton.click();
    return new DocumentUpdatePage();
  }

  async deleteDocument() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const documentDeleteDialog = new DocumentDeleteDialog();
    await waitUntilDisplayed(documentDeleteDialog.deleteModal);
    expect(await documentDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/issatyApp.document.delete.question/);
    await documentDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(documentDeleteDialog.deleteModal);

    expect(await isVisible(documentDeleteDialog.deleteModal)).to.be.false;
  }
}
