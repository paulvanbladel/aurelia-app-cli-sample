import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';


@inject(HttpClient)
export class GitHubUserInfo {

  constructor(http) {
    this.http = http;
  }

  help() {
    return 'gets github user profile picture based on github user name';
  }
  resolveCommandLineArgs(args) {
    this.username = args[1];
  }

  updateAppCommand(command) {
    command.outputType = 'html';
  }

  execute() {
    return this.http.fetch('https://api.github.com/users/' + this.username)
      .then(response => response.json())
      .then(user => {
        if (user.login === undefined) {
          throw user.message;
        }
        return `<img  src=${user.avatar_url}></img>`;
      });
  }
}
