import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import StudentUpdatePage from './student-update.page-object';

const expect = chai.expect;
export class StudentDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('issatyApp.student.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-student'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class StudentComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('student-heading'));
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
    await navBarPage.getEntityPage('student');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateStudent() {
    await this.createButton.click();
    return new StudentUpdatePage();
  }

  async deleteStudent() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const studentDeleteDialog = new StudentDeleteDialog();
    await waitUntilDisplayed(studentDeleteDialog.deleteModal);
    expect(await studentDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/issatyApp.student.delete.question/);
    await studentDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(studentDeleteDialog.deleteModal);

    expect(await isVisible(studentDeleteDialog.deleteModal)).to.be.false;
  }
}
