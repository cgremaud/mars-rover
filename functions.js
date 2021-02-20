const Rover = require("./rover.js")
const Message = require("./message.js")
const Command = require("./command.js")
const input = require('readline-sync')

function createRoverInstance(position){
  return new Rover(position)
}

function promptUser(rover){
  let userInput 
  userInput = input.question("[P]: Update Position, [M]: Mode Change, [S]: Status Check, [Q]: Quit\nWhat will you do?: ")
  return userInput.toUpperCase()
}

module.exports = {
  promptUser,
  createRoverInstance
}