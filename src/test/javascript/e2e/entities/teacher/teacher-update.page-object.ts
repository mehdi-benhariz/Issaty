import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class TeacherUpdatePage {
  pageTitle: ElementFinder = element(by.id('issatyApp.teacher.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  gradeSelect: ElementFinder = element(by.css('select#teacher-grade'));
  isChefInput: ElementFinder = element(by.css('input#teacher-isChef'));
  bureauInput: ElementFinder = element(by.css('input#teacher-bureau'));
  profileSelect: ElementFinder = element(by.css('select#teacher-profile'));
  userSelect: ElementFinder = element(by.css('select#teacher-user'));
  chefOfDepartmentSelect: ElementFinder = element(by.css('select#teacher-chefOfDepartment'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setGradeSelect(grade) {
    await this.gradeSelect.sendKeys(grade);
  }

  async getGradeSelect() {
    return this.gradeSelect.element(by.css('option:checked')).getText();
  }

  async gradeSelectLastOption() {
    await this.gradeSelect.all(by.tagName('option')).last().click();
  }
  getIsChefInput() {
    return this.isChefInput;
  }
  async setBureauInput(bureau) {
    await this.bureauInput.sendKeys(bureau);
  }

  async getBureauInput() {
    return this.bureauInput.getAttribute('value');
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

  async chefOfDepartmentSelectLastOption() {
    await this.chefOfDepartmentSelect.all(by.tagName('option')).last().click();
  }

  async chefOfDepartmentSelectOption(option) {
    await this.chefOfDepartmentSelect.sendKeys(option);
  }

  getChefOfDepartmentSelect() {
    return this.chefOfDepartmentSelect;
  }

  async getChefOfDepartmentSelectedOption() {
    return this.chefOfDepartmentSelect.element(by.css('option:checked')).getText();
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
    await this.gradeSelectLastOption();
    await waitUntilDisplayed(this.saveButton);
    const selectedIsChef = await this.getIsChefInput().isSelected();
    if (selectedIsChef) {
      await this.getIsChefInput().click();
      expect(await this.getIsChefInput().isSelected()).to.be.false;
    } else {
      await this.getIsChefInput().click();
      expect(await this.getIsChefInput().isSelected()).to.be.true;
    }
    await waitUntilDisplayed(this.saveButton);
    await this.setBureauInput('bureau');
    expect(await this.getBureauInput()).to.match(/bureau/);
    await this.profileSelectLastOption();
    await this.userSelectLastOption();
    await this.chefOfDepartmentSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
