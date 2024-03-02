import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import GroupUpdatePage from './group-update.page-object';

const expect = chai.expect;
export class GroupDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('issatyApp.group.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-group'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class GroupComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('group-heading'));
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
    await navBarPage.getEntityPage('group');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateGroup() {
    await this.createButton.click();
    return new GroupUpdatePage();
  }

  async deleteGroup() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const groupDeleteDialog = new GroupDeleteDialog();
    await waitUntilDisplayed(groupDeleteDialog.deleteModal);
    expect(await groupDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/issatyApp.group.delete.question/);
    await groupDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(groupDeleteDialog.deleteModal);

    expect(await isVisible(groupDeleteDialog.deleteModal)).to.be.false;
  }
}
