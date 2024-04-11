import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class GroupUpdatePage {
  pageTitle: ElementFinder = element(by.id('issatyApp.group.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nameInput: ElementFinder = element(by.css('input#group-name'));
  emploiSelect: ElementFinder = element(by.css('select#group-emploi'));
  subjectSelect: ElementFinder = element(by.css('select#group-subject'));
  documentSelect: ElementFinder = element(by.css('select#group-document'));
  majorSelect: ElementFinder = element(by.css('select#group-major'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return this.nameInput.getAttribute('value');
  }

  async emploiSelectLastOption() {
    await this.emploiSelect.all(by.tagName('option')).last().click();
  }

  async emploiSelectOption(option) {
    await this.emploiSelect.sendKeys(option);
  }

  getEmploiSelect() {
    return this.emploiSelect;
  }

  async getEmploiSelectedOption() {
    return this.emploiSelect.element(by.css('option:checked')).getText();
  }

  async subjectSelectLastOption() {
    await this.subjectSelect.all(by.tagName('option')).last().click();
  }

  async subjectSelectOption(option) {
    await this.subjectSelect.sendKeys(option);
  }

  getSubjectSelect() {
    return this.subjectSelect;
  }

  async getSubjectSelectedOption() {
    return this.subjectSelect.element(by.css('option:checked')).getText();
  }

  async documentSelectLastOption() {
    await this.documentSelect.all(by.tagName('option')).last().click();
  }

  async documentSelectOption(option) {
    await this.documentSelect.sendKeys(option);
  }

  getDocumentSelect() {
    return this.documentSelect;
  }

  async getDocumentSelectedOption() {
    return this.documentSelect.element(by.css('option:checked')).getText();
  }

  async majorSelectLastOption() {
    await this.majorSelect.all(by.tagName('option')).last().click();
  }

  async majorSelectOption(option) {
    await this.majorSelect.sendKeys(option);
  }

  getMajorSelect() {
    return this.majorSelect;
  }

  async getMajorSelectedOption() {
    return this.majorSelect.element(by.css('option:checked')).getText();
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
    await this.setNameInput('name');
    expect(await this.getNameInput()).to.match(/name/);
    await this.emploiSelectLastOption();
    await this.subjectSelectLastOption();
    await this.documentSelectLastOption();
    await this.majorSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
