import environment from './environment';

//Configure Bluebird Promises.
//Note: You may want to use environment-specific configuration.
Promise.config({
  warnings: {
    wForgottenReturn: false
  }
});


// aurelia-app-cli plugin specific
import * as commands from './Commands/index';


export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature('resources')
    .plugin('aurelia-app-cli');

debugger;
Reflect.ownKeys(commands).forEach(a => {
  if (a != "__esModule") {
    aurelia.use.transient("Command", commands[a]);
  }
});


  if (environment.debug) {
    aurelia.use.developmentLogging();
  }

  if (environment.testing) {
    aurelia.use.plugin('aurelia-testing');
  }

  aurelia.start().then(() => aurelia.setRoot());
}
