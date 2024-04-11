import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import TeacherUpdatePage from './teacher-update.page-object';

const expect = chai.expect;
export class TeacherDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('issatyApp.teacher.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-teacher'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class TeacherComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('teacher-heading'));
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
    await navBarPage.getEntityPage('teacher');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateTeacher() {
    await this.createButton.click();
    return new TeacherUpdatePage();
  }

  async deleteTeacher() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const teacherDeleteDialog = new TeacherDeleteDialog();
    await waitUntilDisplayed(teacherDeleteDialog.deleteModal);
    expect(await teacherDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/issatyApp.teacher.delete.question/);
    await teacherDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(teacherDeleteDialog.deleteModal);

    expect(await isVisible(teacherDeleteDialog.deleteModal)).to.be.false;
  }
}
