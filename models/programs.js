const { v4: uuidv4 } = require('uuid');
var counter = 0;

/*
 * Program class
 * @param name - name of the program
 * @param description - description of the program
 * @param author - author of the program
 * @param date - date the program was created
 * @param counter - counter for the number of programs
 * @param programFull - boolean for if the program is full
 * @param id - unique id for the program
*/
class Program{
    constructor(name, description, author, date){
        this.id = uuidv4();
        this.name = name;
        this.description = description;
        this.author = author;
        this.date = date;
        this.counter = counter;
        counter++;
        this.programFull = false;
        if(this.counter >= 9) this.programFull = true;
    }
}

module.exports = { Program };