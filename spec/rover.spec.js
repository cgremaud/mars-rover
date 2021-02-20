const Rover = require("../rover.js");
const Command = require("../command.js");
const Message = require("../message.js");
const assert = require('assert')
describe("Rover class", () => {
  it("constructor sets position and default values for mode and generatorWatts", () => {
    let rover = new Rover(120)
    //this also doesn't work. You can only have two arguments. Why are the directions asking you to test so many things in one test? Shouldn't there be separate tests for each of these conditions?
    //nm now it works? Still seems like doing too much in 1 test.  
    assert.strictEqual((rover.generatorWatts === 110 && rover.position === 120 && rover.mode === "NORMAL"), true)
  })
  fit('response returned by receiveMessage contains name of message', () => {
    let command = new Command("MOVE", 120)
    let messageInput = new Message('Message Name', [command]);
    let rover = new Rover(120)
    let messageOutput = rover.receiveMessage(messageInput)
    assert.strictEqual(messageOutput.name, messageInput.name)
  })
  it('response returned by receiveMessage includes two results if two commands are sent in the message', () =>{
    
    let command0 = new Command("MOVE", 123);
    let command1 = new Command("MODE_CHANGE", "LOW_POWER");
    let messageInput = new Message('Message Name', [command0, command1]);
    let rover = new Rover(120, messageInput)
    let messageOutput = rover.receiveMessage(messageInput);
    assert.strictEqual(messageOutput.results.length, 2)
  })
  //I THINK this is testing for the right thing. But not sure if they want it set up to be results[0].name
  it('responds correctly to status check command', () => {
    let modeChange = new Command("MODE_CHANGE", "LOW_POWER")
    let statusCheck = new Command("STATUS_CHECK")
    let messageInput = new Message("Status check test message", [statusCheck, modeChange])
    let rover = new Rover(120, messageInput);
    let results = rover.receiveMessage(messageInput).results
    let expectedResults = [
      {
         completed: true,
         roverStatus: { mode: 'LOW_POWER', generatorWatts: 110, position: 98382 }
      }
   ]
    //results should be an array of objects that all have the property .name, right? Or am I misunderstanding what receiveMessage should return? 
    assert.strictEqual(results[0].name, 'statusCheck')
  })
})