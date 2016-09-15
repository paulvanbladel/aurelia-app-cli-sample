export class EchoMe {


    ResolveCommandLineArgs(args) {
        this.input = args[1];
    }

    UpdateAppCommand() {

    }

    help() {
        return "echoes some text";
    }

    Execute() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                //transform args

                if (this.input === "xxx") {
                    reject("we are simulating an error here...");
                }
                var returnValue = "response from promise for " + String.fromCharCode(13) + this.input;
                resolve(returnValue);
            }, 2000);
        });
    }
}