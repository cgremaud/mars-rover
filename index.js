/*
  DON'T EDIT THIS FILE
  Click Run to run the tests.
  Add new tests and .js files.
*/
const Jasmine = require('jasmine');
const jasmine = new Jasmine();

jasmine.loadConfig({
  spec_dir: 'spec',
  spec_files: [
    "**/*[sS]pec.js"
  ],
});

jasmine.execute();
//add stuff to this file for version control testing. 
//adding scripting and user input
const Rover = require("./rover.js")
const Message = require("./message.js")
const Command = require("./command.js")
const functions = require("./functions.js")
const input = require('readline-sync')

let initialRover = new Rover
functions.promptUser(initialRover)