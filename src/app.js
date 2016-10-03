export class App {
  configureRouter(config, router) {
    config.title = 'Aurelia';
    config.map([
      { route: ['', 'cli-intro'],         name: 'cli-intro',        moduleId: './cli-intro',        nav: true, title: 'cli-intro' },
      { route: 'welcome', name: 'welcome',      moduleId: './welcome',      nav: true, title: 'Welcome' },
      { route: 'child-router',  name: 'child-router', moduleId: './child-router', nav: true, title: 'Child Router' }
    ]);

    this.router = router;
  }
}


