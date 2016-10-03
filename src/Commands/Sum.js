export class Sum {

  resolveCommandLineArgs(args) {
    this.x = Number(args[1]);
    this.y = Number(args[2]);
    //etc...

    this.validateInputParameters();
  }
  validateInputParameters() {
    // if(args.length != 3) { return new CmdResult("Exactly 2 operands required", false, true); }
  }
  updateAppCommand() {

  }

  help() {
    return 'adds two integers';
  }
  execute() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        //transform args

        let returnValue = (this.x + this.y).toString();
        resolve(returnValue);
      }, 2000);
    });
  }
}
