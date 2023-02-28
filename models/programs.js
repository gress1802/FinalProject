const { v4: uuidv4 } = require('uuid');

//FAKE DATABASE
const BY_ID = {};
const BY_NAME = {};

/*
 * Program class
 * @param {String} name - name of the program
 * @param {String} description - description of the program
 * @param {String} author - author of the program
 * @param {Date} created - date the program was created
 * @param {Boolean} programFull - boolean for if the program is full
 * @param {int} id - unique id for the program
 * @param {int} maxParticipants - number of participants there can be in the program
 * @param {int} duration - duration of the program
 * @param {int} price - price of the program
 * @param {time} time - time of the program
 * @param {String} location - location of the program
 * @param {int} numParticipants - number of participants in the program
 * @param {String array} participantList - a list of participants in the program
*/
class Program{
    constructor(name, description, author, maxParticipants, duration, price, time, location){
        this.id = uuidv4();
        this.name = name;
        let created = Date.now();
        this.time = time;
        this.location = location;
        this.description = description;
        this.price = price;
        this.author = author;
        this.programFull = false;
        //add to database
        BY_ID[this.id] = this;
        BY_NAME[this.name] = this;
        this.maxParticipants = 0;
        this.numParticipants = 0;
        this.duration = duration;
        this.participantList = [];
    }
}

//Get program by id (returns a copy of the program object)
function getProgramById(id){
    let program = BY_ID[id];
    return program && Object.assign({}, program);
}

//Get program by name (returns a copy of the program object)
function getProgramByName(name){
    let program = BY_NAME[name];
    return program && Object.assign({}, program);
}

//Get all programs (returns a copy of the program object)
//map() function is called on the array of program objects to create a new array with the results of calling a function for every array element.
function getAllPrograms(){
    return Object.values(BY_ID).map(program => Object.assign({}, program));
}

module.exports = {Program, getProgramById, getProgramByName, getAllPrograms};