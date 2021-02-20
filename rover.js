
class Rover {
  //should I even be passing message as an argument into the constructor? 
  constructor(position, /*message = {name: null , commands: null,}*/ generatorWatts = 110){
    this.position = position;
    this.mode = 'NORMAL';
    this.generatorWatts = generatorWatts;
    
  // if (message.commands.includes("STATUS_CHECK")){}
    
  }
  receiveMessage(message) {
    
    // let roverStatus = {
    //   name: "roverStatus",
    //   value: null
    // }
    //let results = []
    
    let messageOutput = {
      message: message.name,
      results: message.commands,
    
    }  

    return messageOutput
  }
}

module.exports = Rover