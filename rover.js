
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
    roverStatus: {mode: this.mode, generatorWatts: this.generatorWatts, position: this.position}
  }
  let modeChangeResponse = {
    completed: true, 
  }
  let rejectCommandResponse = {
    completed: false
  }
  let genericResponse = {
    completed: true,
  }
  for (let i = 0; i < message.commands.length; i++){
    if (message.commands[i].commandType === "STATUS_CHECK"){
      commandResults.push(statusCheckResponse)
    } else if (message.commands[i].commandType === "MODE_CHANGE"){
      commandResults.push(modeChangeResponse)
      this.mode = message.commands[i].value
    } else{
      commandResults.push(genericResponse)
    }
    
  }
  let outputMessage = {
    message: message.name,
    results: commandResults
  }
  return outputMessage
  }
}

module.exports = Rover