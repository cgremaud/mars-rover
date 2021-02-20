const Rover = require("./rover.js")
const Message = require("./message.js")
const Command = require("./command.js")
const input = require('readline-sync')

function createRoverInstance(position){
  return new Rover(position)
}

updatePosition(newPosition){
  // let newPosition = input.question("Enter new position: ")
  let updatePosition = new Command("MOVE", newPosition)
  return updatePosition 
}

function promptUser(rover){
  let userCommand 
  let numCommands 
  let commandsArray
  for (let i = 0; i < numCommands -1; i++)  
    userCommand = input.question("[P]: Update Position, [M]: Mode Change, [S]: Status Check, [Q]: Quit\nWhat will you do?: ")
    if (userCommand === "P"){
      let userPosition = input.question("")
      commandsArray.push(updatePosition(r))
    } else if (userCommand === "M"){

    } else if (userCommand === "S"){

    } else if (userCommand === "Q"){

    } else {
      
    }
    //return userCommand.toUpperCase()
}


module.exports = {
  promptUser,
  createRoverInstance
}

//actually what I should do is create a loop that calls the prompt function for a given number of times and builds an array out of the user's inputs. 