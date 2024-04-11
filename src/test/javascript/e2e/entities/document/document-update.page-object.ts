import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class DocumentUpdatePage {
  pageTitle: ElementFinder = element(by.id('issatyApp.document.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  statusSelect: ElementFinder = element(by.css('select#document-status'));
  typeSelect: ElementFinder = element(by.css('select#document-type'));
  fileSelect: ElementFinder = element(by.css('select#document-file'));
  urlInput: ElementFinder = element(by.css('input#document-url'));
  ownerSelect: ElementFinder = element(by.css('select#document-owner'));
  teacherSelect: ElementFinder = element(by.css('select#document-teacher'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setStatusSelect(status) {
    await this.statusSelect.sendKeys(status);
  }

  async getStatusSelect() {
    return this.statusSelect.element(by.css('option:checked')).getText();
  }

  async statusSelectLastOption() {
    await this.statusSelect.all(by.tagName('option')).last().click();
  }
  async setTypeSelect(type) {
    await this.typeSelect.sendKeys(type);
  }

  async getTypeSelect() {
    return this.typeSelect.element(by.css('option:checked')).getText();
  }

  async typeSelectLastOption() {
    await this.typeSelect.all(by.tagName('option')).last().click();
  }
  async setFileSelect(file) {
    await this.fileSelect.sendKeys(file);
  }

  async getFileSelect() {
    return this.fileSelect.element(by.css('option:checked')).getText();
  }

  async fileSelectLastOption() {
    await this.fileSelect.all(by.tagName('option')).last().click();
  }
  async setUrlInput(url) {
    await this.urlInput.sendKeys(url);
  }

  async getUrlInput() {
    return this.urlInput.getAttribute('value');
  }

  async ownerSelectLastOption() {
    await this.ownerSelect.all(by.tagName('option')).last().click();
  }

  async ownerSelectOption(option) {
    await this.ownerSelect.sendKeys(option);
  }

  getOwnerSelect() {
    return this.ownerSelect;
  }

  async getOwnerSelectedOption() {
    return this.ownerSelect.element(by.css('option:checked')).getText();
  }

  async teacherSelectLastOption() {
    await this.teacherSelect.all(by.tagName('option')).last().click();
  }

  async teacherSelectOption(option) {
    await this.teacherSelect.sendKeys(option);
  }

  getTeacherSelect() {
    return this.teacherSelect;
  }

  async getTeacherSelectedOption() {
    return this.teacherSelect.element(by.css('option:checked')).getText();
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }

  async enterData() {
    await waitUntilDisplayed(this.saveButton);
    await this.statusSelectLastOption();
    await waitUntilDisplayed(this.saveButton);
    await this.typeSelectLastOption();
    await waitUntilDisplayed(this.saveButton);
    await this.fileSelectLastOption();
    await waitUntilDisplayed(this.saveButton);
    await this.setUrlInput('url');
    expect(await this.getUrlInput()).to.match(/url/);
    await this.ownerSelectLastOption();
    await this.teacherSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
