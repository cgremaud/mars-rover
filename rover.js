
class Rover {
  //should I even be passing message as an argument into the constructor? 
  constructor(position, message /*= {/*name: null , commands: null}*/, generatorWatts = 110){
    this.position = position;
    this.mode = 'NORMAL';
    this.generatorWatts = generatorWatts;
    this.results = null;
  // if (message.commands.includes("STATUS_CHECK")){}
    
  }
  receiveMessage(message) {
    let objectOutput = []
    
    if (message.commands.includes("STATUS_CHECK")){
      this.results = [roverStatus]
    }
    let messageOutput = {
      name: message.name,
      results: message.commands
    }
    // if (message.commands.includes("STATUS_CHECK")){
    //   messageOutput.results += roverStatus
    // }
    return messageOutput
  }
}

module.exports = Rover