import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';


@inject(HttpClient)
export class GitHubUserInfo {

    constructor(http) {
        this.http = http;
    }

    ResolveCommandLineArgs(args) {
        this.username = args[1];
    }

    UpdateAppCommand(command) {
        command.outputType = "html";
    }

    Execute() {
        debugger;
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
