export class EchoMe {


  resolveCommandLineArgs(args) {
    this.input = args[1];
  }

  updateAppCommand() {

  }

  help() {
    return 'echoes some text';
  }

  execute() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        //transform args

        if (this.input === 'xxx') {
          reject('we are simulating an error here...');
        }
        let returnValue = 'response from promise for ' + String.fromCharCode(13) + this.input;
        resolve(returnValue);
      }, 2000);
    });
  }
}
