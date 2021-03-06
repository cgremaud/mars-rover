class Rover { 
  constructor(position){
    this.position = position;
    this.mode = 'NORMAL';
    this.generatorWatts = 110;
    this.results = null;
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
  let unknownCommandResponse = {
      completed: false,
      message: "Error: Unrecognized Command"
  }
  for (let i = 0; i < message.commands.length; i++){
    if (message.commands[i].commandType === "STATUS_CHECK"){
      commandResults.push(statusCheckResponse)
    } else if (message.commands[i].commandType === "MODE_CHANGE"){
      commandResults.push(modeChangeResponse)
      this.mode = message.commands[i].value
    } else if (message.commands[i].commandType === "MOVE" && this.mode === "NORMAL"){
      commandResults.push(genericResponse)
      this.position = message.commands[i].value
    } else if (message.commands[i].commandType === "MOVE" && this.mode === "LOW_POWER"){
      commandResults.push(rejectCommandResponse)
    } else{
      commandResults.push(unknownCommandResponse)
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