class Message {
  constructor(name, commands) {
    this.name = name;
    //these lines are the key to figuring out the test 10 problem.

    if (!name) {
      throw(Error("Message name required."))
    }
    this.commands = commands;
  }
}

module.exports = Message;