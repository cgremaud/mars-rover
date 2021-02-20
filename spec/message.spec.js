const Message = require ('../message.js')
const Command = require('../command.js')
const assert = require('assert')

describe("Message class", () =>{
  it("throws error if a name is NOT passed into the constructor as the first parameter", () => {
    assert.throws(
      () => {
        new Message()
      }, {
        message: "Message name required."
      })
  })
  it("constructor sets name", () => {
    let message1 = new Message("Message Name", 123);
    let message2 = new Message ("Message Name", 321);
    assert.strictEqual(message1.name, message2.name)
  })
  it("contains a commands array passed into the constructor as 2nd argument", () => {
    let command0 = new Command("MOVE", 123);
    let command1 = new Command("MODE_CHANGE", 321)
    let commands = [command0, command1]
    let message = new Message("Move and Mode_Change", commands)
    assert.strictEqual(typeof message.commands[0], "object")
  }) 
})
 