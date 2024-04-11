import { element, by, ElementFinder, protractor } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class ProfileUpdatePage {
  pageTitle: ElementFinder = element(by.id('issatyApp.profile.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  firstNameInput: ElementFinder = element(by.css('input#profile-firstName'));
  lastNameInput: ElementFinder = element(by.css('input#profile-lastName'));
  birthDateInput: ElementFinder = element(by.css('input#profile-birthDate'));
  addressInput: ElementFinder = element(by.css('input#profile-address'));
  profilePicInput: ElementFinder = element(by.css('input#profile-profilePic'));
  emailInput: ElementFinder = element(by.css('input#profile-email'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setFirstNameInput(firstName) {
    await this.firstNameInput.sendKeys(firstName);
  }

  async getFirstNameInput() {
    return this.firstNameInput.getAttribute('value');
  }

  async setLastNameInput(lastName) {
    await this.lastNameInput.sendKeys(lastName);
  }

  async getLastNameInput() {
    return this.lastNameInput.getAttribute('value');
  }

  async setBirthDateInput(birthDate) {
    await this.birthDateInput.sendKeys(birthDate);
  }

  async getBirthDateInput() {
    return this.birthDateInput.getAttribute('value');
  }

  async setAddressInput(address) {
    await this.addressInput.sendKeys(address);
  }

  async getAddressInput() {
    return this.addressInput.getAttribute('value');
  }

  async setProfilePicInput(profilePic) {
    await this.profilePicInput.sendKeys(profilePic);
  }

  async getProfilePicInput() {
    return this.profilePicInput.getAttribute('value');
  }

  async setEmailInput(email) {
    await this.emailInput.sendKeys(email);
  }

  async getEmailInput() {
    return this.emailInput.getAttribute('value');
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
    await this.setFirstNameInput('firstName');
    expect(await this.getFirstNameInput()).to.match(/firstName/);
    await waitUntilDisplayed(this.saveButton);
    await this.setLastNameInput('lastName');
    expect(await this.getLastNameInput()).to.match(/lastName/);
    await waitUntilDisplayed(this.saveButton);
    await this.setBirthDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await this.getBirthDateInput()).to.contain('2001-01-01T02:30');
    await waitUntilDisplayed(this.saveButton);
    await this.setAddressInput('address');
    expect(await this.getAddressInput()).to.match(/address/);
    await waitUntilDisplayed(this.saveButton);
    await this.setProfilePicInput('profilePic');
    expect(await this.getProfilePicInput()).to.match(/profilePic/);
    await waitUntilDisplayed(this.saveButton);
    await this.setEmailInput('email');
    expect(await this.getEmailInput()).to.match(/email/);
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
