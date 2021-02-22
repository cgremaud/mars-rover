const Rover = require("./rover.js")
const Message = require("./message.js")
const Command = require("./command.js")
const input = require('readline-sync')

function createRoverInstance(position){
  return new Rover(position)
}

function updatePosition(newPosition){
  // let newPosition = input.question("Enter new position: ")
  let updatePosition = new Command("MOVE", newPosition)
  return updatePosition 
}

function setMode(mode){
  return new Command("MODE_CHANGE", mode)
}

function checkStatus(){
  return new Command("STATUS_CHECK")
}

function createMessage(array){
  let userMessage = input.question("Enter a name for this message: ")
  return new Message(userMessage, array)
}

function promptUser(rover){
  let userCommand 
  let numCommands = input.question("Enter a number of commands to send in a message: ")
  let commandsArray = []
  let userPosition
  let userMode 
  
  for (let i = 0; i < numCommands; i++){  
    userCommand = input.question("[P]: Update Position, [M]: Mode Change, [S]: Status Check, [Q]: Quit\nWhat will you do?: ").toUpperCase()
    if (userCommand === "P"){
      userPosition = input.question("Enter a position: ")
      commandsArray.push(updatePosition(userPosition))
      
    } else if (userCommand === "M"){
      userMode = input.question("Enter a Mode, NORMAL or LOW_POWER: ")
      commandsArray.push(setMode(userMode))
    } else if (userCommand === "S"){
      console.log("STATUS_CHECK command added.")
      commandsArray.push(checkStatus())
    } else if (userCommand === "Q"){
        break
    }
    // userCommand = input.question("[P]: Update Position, [M]: Mode Change, [S]: Status Check, [Q]: Quit\nWhat will you do?: ").toUpperCase()
  }
  return commandsArray
    //return userCommand.toUpperCase()
}



module.exports = {
  promptUser,
  createRoverInstance,
  createMessage
}

//actually what I should do is create a loop that calls the prompt function for a given number of times and builds an array out of the user's inputs. 