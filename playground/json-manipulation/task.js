const {parseJson} = require('./jsonParser');

const file = './savings-import-per-locale.json';
let jsonObjectToValueMap = new Map();

parseJson(file, jsonObjectToValueMap);