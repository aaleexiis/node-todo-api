const expect = require('expect');
const request = require('supertest');

const {manipulateString, extractInfo} = require('./stringManipulation');
const {findLocales, createInitialMap} = require('./jsonParser');

describe('extractInfo', () => {
    it('should parse $ string', () => {
        const promotion = '$10 Off';
        const parsedPromotion = '10$'
        const result = extractInfo(promotion);
        expect(result).toBe(parsedPromotion);
    });

    it('should parse % string', () => {
        const promotion = '60% off all orders';
        const parsedPromotion = '60%'
        const result = extractInfo(promotion);
        expect(result).toBe(parsedPromotion);
    });

    it('should parse € string', () => {
        const promotion = '100€ di scont';
        const parsedPromotion = '100€'
        const result = extractInfo(promotion);
        expect(result).toBe(parsedPromotion);
    });

    it('should parse £ string', () => {
        const promotion = '£18 Of';
        const parsedPromotion = '18£'
        const result = extractInfo(promotion);
        expect(result).toBe(parsedPromotion);
    });

    it('should parse decimal number', () => {
        const promotion = '$262.05 Off';
        const parsedPromotion = '262.05$'
        const result = extractInfo(promotion);
        expect(result).toBe(parsedPromotion);
    });

    it('should parse number with thousand decimal separator', () => {
        const promotion = '$2,000 Off';
        const parsedPromotion = '2,000$'
        const result = extractInfo(promotion);
        expect(result).toBe(parsedPromotion);
    });
});

describe('JSON parser', () => {
    it('should find all locales', () => {
        const jsonString = '{"us":[{}, {}], "fr":[{}, {}]}';
        const json = JSON.parse(jsonString);
        const locales = findLocales(json);

        expect(locales.length).toBe(2);
        expect(locales[0]).toBe("us");
        expect(locales[1]).toBe("fr");
    });
});