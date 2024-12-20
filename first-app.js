// const fs= require('fs');

// fs.writeFileSync('hello.txt','hello frome node js');
var name = 'max';
console.log(name)

var secondName= name
console.log(secondName)

name = 'chirs'

console.log(secondName)
//string primitive value: copied by values
//takes the content the value of the name "max" and copied it in secondname

var person={
    age:26,
    name: 'max',
    hobbies:['readin','cooking']
}

console.log(person)

//var secondPerson = person
var secondPerson= Object.assign({},person);
console.log(secondPerson)

person.name ='chris'
console.log(secondPerson.name)
//objects are refence types

//primitive types stored in stack(can be accessed very quick)
//refeernce types stored in heap (longer to be acced, more information can be saved not short term)
var thirdPerson= {
    age:26,
    name: 'max',
    hobbies:['readin','cooking']
}
console.log(thirdPerson)
console.log(person)