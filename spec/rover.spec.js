const Rover = require("../rover.js");
const Command = require("../command.js");
const Message = require("../message.js");
const assert = require('assert')
describe("Rover class", () => {
  it("constructor sets position and default values for mode and generatorWatts", () => {
    let rover = new Rover(120)
    assert.strictEqual((rover.generatorWatts === 110 && rover.position === 120 && rover.mode === "NORMAL"), true)
  })
  it('response returned by receiveMessage contains name of message', () => {
    let command = new Command("MOVE", 122)
    let messageInput = new Message('Message Name', [command]);
    let rover = new Rover(120)
    let messageOutput = rover.receiveMessage(messageInput)
    assert.strictEqual(messageOutput.message, messageInput.name)
  })
  it('response returned by receiveMessage includes two results if two commands are sent in the message', () =>{
    let command0 = new Command("MOVE", 123);
    let command1 = new Command("STATUS_CHECK");
    let messageInput = new Message('Message Name', [command0, command1]);
    let rover = new Rover(120)
    let messageOutput = rover.receiveMessage(messageInput);
    assert.strictEqual(messageOutput.results.length, 2)
  })
  
  it('responds correctly to status check command', () => {
    let statusCheck = new Command("STATUS_CHECK")
    let messageInput = new Message("Status Check", [statusCheck])
    let rover = new Rover(120);
    let results = rover.receiveMessage(messageInput).results
    let expectedResults =[
      {
         completed: true,
         roverStatus: { mode: 'NORMAL', generatorWatts: 110, 
         position: 120 }
      }
   ]
    assert.deepStrictEqual(results, expectedResults)
  }) 
  it("responds correctly to mode change command", () => {
    let modeChange = new Command("MODE_CHANGE", "LOW_POWER")
    let commands = [modeChange]
    let messageInput = new Message ("Mode Change", commands)
    let rover = new Rover(120)
    rover.receiveMessage(messageInput)
    assert.strictEqual(rover.mode, "LOW_POWER")
  })
  it("responds with false completed value when attempting to move in LOW_POWER mode", () => {
    let modeChange = new Command("MODE_CHANGE", "LOW_POWER")
    let move = new Command("MOVE", 121)
    let rover = new Rover(120)
    let commands = [modeChange, move]
    let messageInput = new Message("Mode change and move", commands)
    let results = rover.receiveMessage(messageInput).results
    //make 2 separate assert statements. 
    assert.strictEqual(results[1].completed, false)
    assert.strictEqual(rover.position, 120)
  })
  it("responds with position for move command", () => {
    let move = new Command("MOVE", 121)
    let rover = new Rover(120)
    let message = new Message("Move", [move])
    rover.receiveMessage(message)
    assert.strictEqual(rover.position, 121)
  })
  it("responds with a false and a message for an unknown command", () => {
    let falseCommand = new Command("STUPID_ROVER", "U_SUCK")
    let message = new Message("False command", [falseCommand])
    let rover = new Rover(120)
    let results = rover.receiveMessage(message).results
    let expectedResults = [
      {
        completed: false,
        message: "Error: Unrecognized Command"
      }
    ]
    assert.deepStrictEqual(results, expectedResults)

  })
})