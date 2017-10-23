const _ = require('lodash');
const jsonfile = require('jsonfile');
const fs = require('fs');

const {manipulateString} = require('./stringManipulation');

const findLocales = (json) => {
    let locales = [];
    Object.keys(json).forEach(x => locales.push(x));
    return locales;
};

const createInitialMap = (json, locales, jsonObjectToValueMap) => {
    locales.forEach((locale) => {
        json[locale].forEach((obj) => {
            jsonObjectToValueMap.set(obj, null);
        });
    });
};

const parseJson = (file, jsonObjectToValueMap) => {
    jsonfile.readFile(file, (err, json) => {
        if (err) {
            return console.log(err);
        }
        const locales = findLocales(json);
        createInitialMap(json, locales, jsonObjectToValueMap);
        manipulateString(jsonObjectToValueMap);
    });
};

module.exports= {findLocales, createInitialMap, parseJson};