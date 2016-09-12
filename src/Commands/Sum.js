export class Sum {

    ResolveCommandLineArgs(args) {
        this.x = Number(args[1]);
        this.y = Number(args[2]);
        //etc...

        this.ValidateInputParameters();
    }
    ValidateInputParameters() {
        // if(args.length != 3) { return new CmdResult("Exactly 2 operands required", false, true); }
    }
    UpdateAppCommand() {

    }


    Execute() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                //transform args

                var returnValue = (this.x + this.y).toString();
                resolve(returnValue);
            }, 2000);
        });
    }
}