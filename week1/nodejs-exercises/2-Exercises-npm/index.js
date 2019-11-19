const padLeft = require("pad-right");
numbers = ["12", "846", "2", "1236"]
numbers.forEach(number => {

    console.log(padLeft(number, 8, " 0"))
});