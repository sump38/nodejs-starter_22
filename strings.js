const myString = 'Hello world!';

const myObject = {
    hello: 'Hello world',
    sayName(name) {
        return 'my name is ' + name;
    }
}


module.exports = {
    str1: myString,
    obj1: myObject
};