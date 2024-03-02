import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class AdminUpdatePage {
  pageTitle: ElementFinder = element(by.id('issatyApp.admin.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  isSuperInput: ElementFinder = element(by.css('input#admin-isSuper'));
  roleSelect: ElementFinder = element(by.css('select#admin-role'));
  profileSelect: ElementFinder = element(by.css('select#admin-profile'));
  userSelect: ElementFinder = element(by.css('select#admin-user'));

  getPageTitle() {
    return this.pageTitle;
  }

  getIsSuperInput() {
    return this.isSuperInput;
  }
  async setRoleSelect(role) {
    await this.roleSelect.sendKeys(role);
  }

  async getRoleSelect() {
    return this.roleSelect.element(by.css('option:checked')).getText();
  }

  async roleSelectLastOption() {
    await this.roleSelect.all(by.tagName('option')).last().click();
  }
  async profileSelectLastOption() {
    await this.profileSelect.all(by.tagName('option')).last().click();
  }

  async profileSelectOption(option) {
    await this.profileSelect.sendKeys(option);
  }

  getProfileSelect() {
    return this.profileSelect;
  }

  async getProfileSelectedOption() {
    return this.profileSelect.element(by.css('option:checked')).getText();
  }

  async userSelectLastOption() {
    await this.userSelect.all(by.tagName('option')).last().click();
  }

  async userSelectOption(option) {
    await this.userSelect.sendKeys(option);
  }

  getUserSelect() {
    return this.userSelect;
  }

  async getUserSelectedOption() {
    return this.userSelect.element(by.css('option:checked')).getText();
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
    const selectedIsSuper = await this.getIsSuperInput().isSelected();
    if (selectedIsSuper) {
      await this.getIsSuperInput().click();
      expect(await this.getIsSuperInput().isSelected()).to.be.false;
    } else {
      await this.getIsSuperInput().click();
      expect(await this.getIsSuperInput().isSelected()).to.be.true;
    }
    await waitUntilDisplayed(this.saveButton);
    await this.roleSelectLastOption();
    await this.profileSelectLastOption();
    await this.userSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
