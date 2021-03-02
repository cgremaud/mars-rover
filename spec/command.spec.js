const assert = require('assert');
const Command = require('../command.js');

describe("Command class", () => {

  it("throws error if command type is NOT passed into constructor as the first parameter", () => {
    assert.throws(
      () => {
        new Command();
      },
      {
        message: 'Command type required.'
      }
    );
  });
  //refactored this to fit actual/expected, but kept extra code just in case.  
  it("constructor sets command type", () => {
    let command = new Command("MOVE", 123)
    let command2 = new Command("MOVE", 321)
    assert.strictEqual(command.commandType, "MOVE")
  })
  it("constructor sets a value passed in as the 2nd argument", () => {
    //leaving the old version commented out for future 
    let command = new Command("MOVE", 123)
    // let command2 = new Command("MODE_CHANGE", 123)
    //assert.strictEqual(command.value, command2.value)
    assert.strictEqual(command.value, 123)
  })

});