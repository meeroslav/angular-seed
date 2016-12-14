import { browser, by, element } from 'protractor';

describe('App', function () {

    beforeEach(function () {
        browser.get('/');
    });

    it('should have a title', function () {
        expect(browser.getTitle()).toEqual("Angular 2 Seed");
    });

    it('should have <home>', function () {
        expect(element(by.css('app home')).isPresent()).toEqual(true);
    });

    it('should have a main title', function () {
        expect(element(by.css('home h1')).getText()).toEqual('Some html content');
    });
});
