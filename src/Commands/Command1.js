export class Command1 {

  
    ResolveCommandLineArgs(args) {
        this.input = args[1];
    }
   
   UpdateAppCommand(){
       
   }

    Execute() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                //transform args

                if (this.input === "xxx") {
                    reject("we are simulating an error here...");
                }
                var returnValue = "response from promise for " + this.input;
                resolve(returnValue);
            }, 2000);
        });
    }
}