
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
  let commandResults = []
  let statusCheckResponse = {
    completed: true,
    roverStatus: {mode: "NORMAL", generatorWatts: 110, position: 120}
  }
  let modeChangeResponse = {
    completed: true, 
  }
  let genericResponse = {
    completed: true,
  }
  for (let i = 0; i < message.commands.length; i++){
    if (message.commands[i].commandType === "STATUS_CHECK"){
      commandResults.push(statusCheckResponse)
    } else if (message.commands[i].commandType === "MODE_CHANGE"){
      commandResults.push(modeChangeResponse)
    } else{
      commandResults.push(genericResponse)
    }
    
  }
  let outputMessage ={
    message: message.name,
    results: commandResults
  }
  return outputMessage
  }
}

module.exports = Rover