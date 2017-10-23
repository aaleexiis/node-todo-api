const _ = require('lodash');

const extractInfo = (promotion) => {
    const specialCharacters = ['%', '$', '€', '£' ];
    const numberSeparators = ['.', ','];

    let number = '';
    let specialChar = '';
    promotion.split('')
        .forEach((x) => {
            if (_.includes(specialCharacters, x)) {
                specialChar = x;
            } else if(!isNaN(x) || _.includes(numberSeparators, x)){
                number += x;
            }
        });
    return number.trim() + specialChar.trim();
};

const manipulateString = (input) =>  {
    input.forEach((value, key) => {
        if(key.promotion) {
            input.set(key, extractInfo(key.promotion));
        }
    });
};

module.exports= {extractInfo, manipulateString};

