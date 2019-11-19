'use strict';
const numbers = ["12", "846", "2", "1236"]

function padLeft(val, num, str) {
    return '00000'.replace(/0/g, str).slice(0, num - val.length) + val;
}

module.exports = {
    padLeft: padLeft,
    numbers: numbers
};