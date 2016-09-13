define('app',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var App = exports.App = function () {
    function App() {
      _classCallCheck(this, App);
    }

    App.prototype.configureRouter = function configureRouter(config, router) {
      config.title = 'Aurelia';
      config.map([{ route: ['', 'welcome'], name: 'welcome', moduleId: './welcome', nav: true, title: 'Welcome' }, { route: 'users', name: 'users', moduleId: './users', nav: true, title: 'Github Users' }, { route: 'child-router', name: 'child-router', moduleId: './child-router', nav: true, title: 'Child Router' }]);

      this.router = router;
    };

    return App;
  }();
});
define('blur-image',["exports", "aurelia-framework"], function (exports, _aureliaFramework) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.BlurImageCustomAttribute = undefined;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _dec, _class;

	var BlurImageCustomAttribute = exports.BlurImageCustomAttribute = (_dec = (0, _aureliaFramework.inject)(Element), _dec(_class = function () {
		function BlurImageCustomAttribute(element) {
			_classCallCheck(this, BlurImageCustomAttribute);

			this.element = element;
		}

		BlurImageCustomAttribute.prototype.valueChanged = function valueChanged(newImage) {
			var _this = this;

			if (newImage.complete) {
				drawBlur(this.element, newImage);
			} else {
				newImage.onload = function () {
					return drawBlur(_this.element, newImage);
				};
			}
		};

		return BlurImageCustomAttribute;
	}()) || _class);


	var mul_table = [512, 512, 456, 512, 328, 456, 335, 512, 405, 328, 271, 456, 388, 335, 292, 512, 454, 405, 364, 328, 298, 271, 496, 456, 420, 388, 360, 335, 312, 292, 273, 512, 482, 454, 428, 405, 383, 364, 345, 328, 312, 298, 284, 271, 259, 496, 475, 456, 437, 420, 404, 388, 374, 360, 347, 335, 323, 312, 302, 292, 282, 273, 265, 512, 497, 482, 468, 454, 441, 428, 417, 405, 394, 383, 373, 364, 354, 345, 337, 328, 320, 312, 305, 298, 291, 284, 278, 271, 265, 259, 507, 496, 485, 475, 465, 456, 446, 437, 428, 420, 412, 404, 396, 388, 381, 374, 367, 360, 354, 347, 341, 335, 329, 323, 318, 312, 307, 302, 297, 292, 287, 282, 278, 273, 269, 265, 261, 512, 505, 497, 489, 482, 475, 468, 461, 454, 447, 441, 435, 428, 422, 417, 411, 405, 399, 394, 389, 383, 378, 373, 368, 364, 359, 354, 350, 345, 341, 337, 332, 328, 324, 320, 316, 312, 309, 305, 301, 298, 294, 291, 287, 284, 281, 278, 274, 271, 268, 265, 262, 259, 257, 507, 501, 496, 491, 485, 480, 475, 470, 465, 460, 456, 451, 446, 442, 437, 433, 428, 424, 420, 416, 412, 408, 404, 400, 396, 392, 388, 385, 381, 377, 374, 370, 367, 363, 360, 357, 354, 350, 347, 344, 341, 338, 335, 332, 329, 326, 323, 320, 318, 315, 312, 310, 307, 304, 302, 299, 297, 294, 292, 289, 287, 285, 282, 280, 278, 275, 273, 271, 269, 267, 265, 263, 261, 259];

	var shg_table = [9, 11, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24];

	var BLUR_RADIUS = 40;

	function stackBlurCanvasRGBA(canvas, top_x, top_y, width, height, radius) {
		if (isNaN(radius) || radius < 1) return;
		radius |= 0;

		var context = canvas.getContext("2d");
		var imageData;

		try {
			imageData = context.getImageData(top_x, top_y, width, height);
		} catch (e) {
			throw new Error("unable to access image data: " + e);
		}

		var pixels = imageData.data;

		var x, y, i, p, yp, yi, yw, r_sum, g_sum, b_sum, a_sum, r_out_sum, g_out_sum, b_out_sum, a_out_sum, r_in_sum, g_in_sum, b_in_sum, a_in_sum, pr, pg, pb, pa, rbs;

		var div = radius + radius + 1;
		var w4 = width << 2;
		var widthMinus1 = width - 1;
		var heightMinus1 = height - 1;
		var radiusPlus1 = radius + 1;
		var sumFactor = radiusPlus1 * (radiusPlus1 + 1) / 2;

		var stackStart = new BlurStack();
		var stack = stackStart;
		for (i = 1; i < div; i++) {
			stack = stack.next = new BlurStack();
			if (i == radiusPlus1) var stackEnd = stack;
		}
		stack.next = stackStart;
		var stackIn = null;
		var stackOut = null;

		yw = yi = 0;

		var mul_sum = mul_table[radius];
		var shg_sum = shg_table[radius];

		for (y = 0; y < height; y++) {
			r_in_sum = g_in_sum = b_in_sum = a_in_sum = r_sum = g_sum = b_sum = a_sum = 0;

			r_out_sum = radiusPlus1 * (pr = pixels[yi]);
			g_out_sum = radiusPlus1 * (pg = pixels[yi + 1]);
			b_out_sum = radiusPlus1 * (pb = pixels[yi + 2]);
			a_out_sum = radiusPlus1 * (pa = pixels[yi + 3]);

			r_sum += sumFactor * pr;
			g_sum += sumFactor * pg;
			b_sum += sumFactor * pb;
			a_sum += sumFactor * pa;

			stack = stackStart;

			for (i = 0; i < radiusPlus1; i++) {
				stack.r = pr;
				stack.g = pg;
				stack.b = pb;
				stack.a = pa;
				stack = stack.next;
			}

			for (i = 1; i < radiusPlus1; i++) {
				p = yi + ((widthMinus1 < i ? widthMinus1 : i) << 2);
				r_sum += (stack.r = pr = pixels[p]) * (rbs = radiusPlus1 - i);
				g_sum += (stack.g = pg = pixels[p + 1]) * rbs;
				b_sum += (stack.b = pb = pixels[p + 2]) * rbs;
				a_sum += (stack.a = pa = pixels[p + 3]) * rbs;

				r_in_sum += pr;
				g_in_sum += pg;
				b_in_sum += pb;
				a_in_sum += pa;

				stack = stack.next;
			}

			stackIn = stackStart;
			stackOut = stackEnd;
			for (x = 0; x < width; x++) {
				pixels[yi + 3] = pa = a_sum * mul_sum >> shg_sum;
				if (pa != 0) {
					pa = 255 / pa;
					pixels[yi] = (r_sum * mul_sum >> shg_sum) * pa;
					pixels[yi + 1] = (g_sum * mul_sum >> shg_sum) * pa;
					pixels[yi + 2] = (b_sum * mul_sum >> shg_sum) * pa;
				} else {
					pixels[yi] = pixels[yi + 1] = pixels[yi + 2] = 0;
				}

				r_sum -= r_out_sum;
				g_sum -= g_out_sum;
				b_sum -= b_out_sum;
				a_sum -= a_out_sum;

				r_out_sum -= stackIn.r;
				g_out_sum -= stackIn.g;
				b_out_sum -= stackIn.b;
				a_out_sum -= stackIn.a;

				p = yw + ((p = x + radius + 1) < widthMinus1 ? p : widthMinus1) << 2;

				r_in_sum += stackIn.r = pixels[p];
				g_in_sum += stackIn.g = pixels[p + 1];
				b_in_sum += stackIn.b = pixels[p + 2];
				a_in_sum += stackIn.a = pixels[p + 3];

				r_sum += r_in_sum;
				g_sum += g_in_sum;
				b_sum += b_in_sum;
				a_sum += a_in_sum;

				stackIn = stackIn.next;

				r_out_sum += pr = stackOut.r;
				g_out_sum += pg = stackOut.g;
				b_out_sum += pb = stackOut.b;
				a_out_sum += pa = stackOut.a;

				r_in_sum -= pr;
				g_in_sum -= pg;
				b_in_sum -= pb;
				a_in_sum -= pa;

				stackOut = stackOut.next;

				yi += 4;
			}
			yw += width;
		}

		for (x = 0; x < width; x++) {
			g_in_sum = b_in_sum = a_in_sum = r_in_sum = g_sum = b_sum = a_sum = r_sum = 0;

			yi = x << 2;
			r_out_sum = radiusPlus1 * (pr = pixels[yi]);
			g_out_sum = radiusPlus1 * (pg = pixels[yi + 1]);
			b_out_sum = radiusPlus1 * (pb = pixels[yi + 2]);
			a_out_sum = radiusPlus1 * (pa = pixels[yi + 3]);

			r_sum += sumFactor * pr;
			g_sum += sumFactor * pg;
			b_sum += sumFactor * pb;
			a_sum += sumFactor * pa;

			stack = stackStart;

			for (i = 0; i < radiusPlus1; i++) {
				stack.r = pr;
				stack.g = pg;
				stack.b = pb;
				stack.a = pa;
				stack = stack.next;
			}

			yp = width;

			for (i = 1; i <= radius; i++) {
				yi = yp + x << 2;

				r_sum += (stack.r = pr = pixels[yi]) * (rbs = radiusPlus1 - i);
				g_sum += (stack.g = pg = pixels[yi + 1]) * rbs;
				b_sum += (stack.b = pb = pixels[yi + 2]) * rbs;
				a_sum += (stack.a = pa = pixels[yi + 3]) * rbs;

				r_in_sum += pr;
				g_in_sum += pg;
				b_in_sum += pb;
				a_in_sum += pa;

				stack = stack.next;

				if (i < heightMinus1) {
					yp += width;
				}
			}

			yi = x;
			stackIn = stackStart;
			stackOut = stackEnd;
			for (y = 0; y < height; y++) {
				p = yi << 2;
				pixels[p + 3] = pa = a_sum * mul_sum >> shg_sum;
				if (pa > 0) {
					pa = 255 / pa;
					pixels[p] = (r_sum * mul_sum >> shg_sum) * pa;
					pixels[p + 1] = (g_sum * mul_sum >> shg_sum) * pa;
					pixels[p + 2] = (b_sum * mul_sum >> shg_sum) * pa;
				} else {
					pixels[p] = pixels[p + 1] = pixels[p + 2] = 0;
				}

				r_sum -= r_out_sum;
				g_sum -= g_out_sum;
				b_sum -= b_out_sum;
				a_sum -= a_out_sum;

				r_out_sum -= stackIn.r;
				g_out_sum -= stackIn.g;
				b_out_sum -= stackIn.b;
				a_out_sum -= stackIn.a;

				p = x + ((p = y + radiusPlus1) < heightMinus1 ? p : heightMinus1) * width << 2;

				r_sum += r_in_sum += stackIn.r = pixels[p];
				g_sum += g_in_sum += stackIn.g = pixels[p + 1];
				b_sum += b_in_sum += stackIn.b = pixels[p + 2];
				a_sum += a_in_sum += stackIn.a = pixels[p + 3];

				stackIn = stackIn.next;

				r_out_sum += pr = stackOut.r;
				g_out_sum += pg = stackOut.g;
				b_out_sum += pb = stackOut.b;
				a_out_sum += pa = stackOut.a;

				r_in_sum -= pr;
				g_in_sum -= pg;
				b_in_sum -= pb;
				a_in_sum -= pa;

				stackOut = stackOut.next;

				yi += width;
			}
		}

		context.putImageData(imageData, top_x, top_y);
	}

	function BlurStack() {
		this.r = 0;
		this.g = 0;
		this.b = 0;
		this.a = 0;
		this.next = null;
	}

	function drawBlur(canvas, image) {
		var w = canvas.width;
		var h = canvas.height;
		var canvasContext = canvas.getContext('2d');
		canvasContext.drawImage(image, 0, 0, w, h);
		stackBlurCanvasRGBA(canvas, 0, 0, w, h, BLUR_RADIUS);
	};
});
define('child-router',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var ChildRouter = exports.ChildRouter = function () {
    function ChildRouter() {
      _classCallCheck(this, ChildRouter);

      this.heading = 'Child Router';
    }

    ChildRouter.prototype.configureRouter = function configureRouter(config, router) {
      config.map([{ route: ['', 'welcome'], name: 'welcome', moduleId: './welcome', nav: true, title: 'Welcome' }, { route: 'users', name: 'users', moduleId: './users', nav: true, title: 'Github Users' }, { route: 'child-router', name: 'child-router', moduleId: './child-router', nav: true, title: 'Child Router' }]);

      this.router = router;
    };

    return ChildRouter;
  }();
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('main',['exports', './environment', './Commands/index'], function (exports, _environment, _index) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  var commands = _interopRequireWildcard(_index);

  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};

      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }

      newObj.default = obj;
      return newObj;
    }
  }

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  Promise.config({
    warnings: {
      wForgottenReturn: false
    }
  });

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources').plugin('aurelia-app-cli', function (config) {
      config.attachCustomCommands(commands);
      config.settings.option1 = 'hi paul';
    });

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('users',['exports', 'aurelia-framework', 'aurelia-fetch-client'], function (exports, _aureliaFramework, _aureliaFetchClient) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Users = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Users = exports.Users = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient), _dec(_class = function () {
    function Users(http) {
      _classCallCheck(this, Users);

      this.heading = 'Github Users';
      this.users = [];

      http.configure(function (config) {
        config.useStandardConfiguration().withBaseUrl('https://api.github.com/');
      });

      this.http = http;
    }

    Users.prototype.activate = function activate() {
      var _this = this;

      return this.http.fetch('users').then(function (response) {
        return response.json();
      }).then(function (users) {
        return _this.users = users;
      });
    };

    return Users;
  }()) || _class);
});
define('welcome',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var Welcome = exports.Welcome = function () {
    function Welcome() {
      _classCallCheck(this, Welcome);

      this.heading = 'Welcome to the Aurelia Navigation App!';
      this.firstName = 'John';
      this.lastName = 'Doe';
      this.previousValue = this.fullName;
    }

    Welcome.prototype.submit = function submit() {
      this.previousValue = this.fullName;
      alert('Welcome, ' + this.fullName + '!');
    };

    Welcome.prototype.canDeactivate = function canDeactivate() {
      if (this.fullName !== this.previousValue) {
        return confirm('Are you sure you want to leave?');
      }
    };

    _createClass(Welcome, [{
      key: 'fullName',
      get: function get() {
        return this.firstName + ' ' + this.lastName;
      }
    }]);

    return Welcome;
  }();

  var UpperValueConverter = exports.UpperValueConverter = function () {
    function UpperValueConverter() {
      _classCallCheck(this, UpperValueConverter);
    }

    UpperValueConverter.prototype.toView = function toView(value) {
      return value && value.toUpperCase();
    };

    return UpperValueConverter;
  }();
});
define('Commands/Command1',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var Command1 = exports.Command1 = function () {
        function Command1() {
            _classCallCheck(this, Command1);
        }

        Command1.prototype.ResolveCommandLineArgs = function ResolveCommandLineArgs(args) {
            this.input = args[1];
        };

        Command1.prototype.UpdateAppCommand = function UpdateAppCommand() {};

        Command1.prototype.help = function help() {
            return "echoes some text";
        };

        Command1.prototype.Execute = function Execute() {
            var _this = this;

            return new Promise(function (resolve, reject) {
                setTimeout(function () {

                    if (_this.input === "xxx") {
                        reject("we are simulating an error here...");
                    }
                    var returnValue = "response from promise for " + String.fromCharCode(13) + _this.input;
                    resolve(returnValue);
                }, 2000);
            });
        };

        return Command1;
    }();
});
define('Commands/github-user-info',['exports', 'aurelia-framework', 'aurelia-fetch-client'], function (exports, _aureliaFramework, _aureliaFetchClient) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.GitHubUserInfo = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var GitHubUserInfo = exports.GitHubUserInfo = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient), _dec(_class = function () {
        function GitHubUserInfo(http) {
            _classCallCheck(this, GitHubUserInfo);

            this.http = http;
        }

        GitHubUserInfo.prototype.help = function help() {
            return "gets github user profile picture based on github user name";
        };

        GitHubUserInfo.prototype.ResolveCommandLineArgs = function ResolveCommandLineArgs(args) {
            this.username = args[1];
        };

        GitHubUserInfo.prototype.UpdateAppCommand = function UpdateAppCommand(command) {
            command.outputType = "html";
        };

        GitHubUserInfo.prototype.Execute = function Execute() {
            debugger;
            return this.http.fetch('https://api.github.com/users/' + this.username).then(function (response) {
                return response.json();
            }).then(function (user) {
                if (user.login === undefined) {
                    throw user.message;
                }
                return '<img  src=' + user.avatar_url + '></img>';
            });
        };

        return GitHubUserInfo;
    }()) || _class);
});
define('Commands/index',['exports', './Command1', './Sum', './github-user-info'], function (exports, _Command, _Sum, _githubUserInfo) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'Command1', {
    enumerable: true,
    get: function () {
      return _Command.Command1;
    }
  });
  Object.defineProperty(exports, 'Sum', {
    enumerable: true,
    get: function () {
      return _Sum.Sum;
    }
  });
  Object.defineProperty(exports, 'GitHubUserInfo', {
    enumerable: true,
    get: function () {
      return _githubUserInfo.GitHubUserInfo;
    }
  });
});
define('Commands/Sum',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var Sum = exports.Sum = function () {
        function Sum() {
            _classCallCheck(this, Sum);
        }

        Sum.prototype.ResolveCommandLineArgs = function ResolveCommandLineArgs(args) {
            this.x = Number(args[1]);
            this.y = Number(args[2]);


            this.ValidateInputParameters();
        };

        Sum.prototype.ValidateInputParameters = function ValidateInputParameters() {};

        Sum.prototype.UpdateAppCommand = function UpdateAppCommand() {};

        Sum.prototype.help = function help() {
            return "adds two integers";
        };

        Sum.prototype.Execute = function Execute() {
            var _this = this;

            return new Promise(function (resolve, reject) {
                setTimeout(function () {

                    var returnValue = (_this.x + _this.y).toString();
                    resolve(returnValue);
                }, 2000);
            });
        };

        return Sum;
    }();
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('text!app.html', ['module'], function(module) { module.exports = "<template>\r\n   <require from=\"bootstrap/css/bootstrap.css\"></require>\r\n  <require from=\"./styles.css\"></require>\r\n  <require from=\"./nav-bar.html\"></require>\r\n  \r\n  <nav-bar router.bind=\"router\"></nav-bar>\r\n\r\n  <div class=\"page-host\">\r\n    <router-view></router-view>\r\n    <app-console></app-console>\r\n  </div>\r\n</template>\r\n"; });
define('text!styles.css', ['module'], function(module) { module.exports = "body {\r\n  margin: 0;\r\n}\r\n\r\n.splash {\r\n  text-align: center;\r\n  margin: 10% 0 0 0;\r\n  box-sizing: border-box;\r\n}\r\n\r\n.splash .message {\r\n  font-size: 72px;\r\n  line-height: 72px;\r\n  text-shadow: rgba(0, 0, 0, 0.5) 0 0 15px;\r\n  text-transform: uppercase;\r\n  font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\r\n}\r\n\r\n.splash .fa-spinner {\r\n  text-align: center;\r\n  display: inline-block;\r\n  font-size: 72px;\r\n  margin-top: 50px;\r\n}\r\n\r\n.page-host {\r\n  position: absolute;\r\n  left: 0;\r\n  right: 0;\r\n  top: 50px;\r\n  bottom: 0;\r\n  overflow-x: hidden;\r\n  overflow-y: auto;\r\n}\r\n\r\n@media print {\r\n  .page-host {\r\n    position: absolute;\r\n    left: 10px;\r\n    right: 0;\r\n    top: 50px;\r\n    bottom: 0;\r\n    overflow-y: inherit;\r\n    overflow-x: inherit;\r\n  }\r\n}\r\n\r\nsection {\r\n  margin: 0 20px;\r\n}\r\n\r\n.navbar-nav li.loader {\r\n  margin: 12px 24px 0 6px;\r\n}\r\n\r\n.pictureDetail {\r\n  max-width: 425px;\r\n}\r\n\r\n/* animate page transitions */\r\nsection.au-enter-active {\r\n  -webkit-animation: fadeInRight 1s;\r\n  animation: fadeInRight 1s;\r\n}\r\n\r\ndiv.au-stagger {\r\n  /* 50ms will be applied between each successive enter operation */\r\n  -webkit-animation-delay: 50ms;\r\n  animation-delay: 50ms;\r\n}\r\n\r\n.card-container.au-enter {\r\n  opacity: 0 !important;\r\n}\r\n\r\n.card-container.au-enter-active {\r\n  -webkit-animation: fadeIn 2s;\r\n  animation: fadeIn 2s;\r\n}\r\n\r\n.card {\r\n  overflow: hidden;\r\n  position: relative;\r\n  border: 1px solid #CCC;\r\n  border-radius: 8px;\r\n  text-align: center;\r\n  padding: 0;\r\n  background-color: #337ab7;\r\n  color: rgb(136, 172, 217);\r\n  margin-bottom: 32px;\r\n  box-shadow: 0 0 5px rgba(0, 0, 0, .5);\r\n}\r\n\r\n.card .content {\r\n  margin-top: 10px;\r\n}\r\n\r\n.card .content .name {\r\n  color: white;\r\n  text-shadow: 0 0 6px rgba(0, 0, 0, .5);\r\n  font-size: 18px;\r\n}\r\n\r\n.card .header-bg {\r\n  /* This stretches the canvas across the entire hero unit */\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n  width: 100%;\r\n  height: 70px;\r\n  border-bottom: 1px #FFF solid;\r\n  border-radius: 6px 6px 0 0;\r\n}\r\n\r\n.card .avatar {\r\n  position: relative;\r\n  margin-top: 15px;\r\n  z-index: 100;\r\n}\r\n\r\n.card .avatar img {\r\n  width: 100px;\r\n  height: 100px;\r\n  -webkit-border-radius: 50%;\r\n  -moz-border-radius: 50%;\r\n  border-radius: 50%;\r\n  border: 2px #FFF solid;\r\n}\r\n\r\n/* animation definitions */\r\n@-webkit-keyframes fadeInRight {\r\n  0% {\r\n    opacity: 0;\r\n    -webkit-transform: translate3d(100%, 0, 0);\r\n    transform: translate3d(100%, 0, 0)\r\n  }\r\n  100% {\r\n    opacity: 1;\r\n    -webkit-transform: none;\r\n    transform: none\r\n  }\r\n}\r\n\r\n@keyframes fadeInRight {\r\n  0% {\r\n    opacity: 0;\r\n    -webkit-transform: translate3d(100%, 0, 0);\r\n    -ms-transform: translate3d(100%, 0, 0);\r\n    transform: translate3d(100%, 0, 0)\r\n  }\r\n  100% {\r\n    opacity: 1;\r\n    -webkit-transform: none;\r\n    -ms-transform: none;\r\n    transform: none\r\n  }\r\n}\r\n\r\n@-webkit-keyframes fadeIn {\r\n  0% {\r\n    opacity: 0;\r\n  }\r\n  100% {\r\n    opacity: 1;\r\n  }\r\n}\r\n\r\n@keyframes fadeIn {\r\n  0% {\r\n    opacity: 0;\r\n  }\r\n  100% {\r\n    opacity: 1;\r\n  }\r\n}\r\n"; });
define('text!child-router.html', ['module'], function(module) { module.exports = "<template>\r\n  <section class=\"au-animate\">\r\n    <h2>${heading}</h2>\r\n    <div>\r\n      <div class=\"col-md-2\">\r\n        <ul class=\"well nav nav-pills nav-stacked\">\r\n          <li repeat.for=\"row of router.navigation\" class=\"${row.isActive ? 'active' : ''}\">\r\n            <a href.bind=\"row.href\">${row.title}</a>\r\n          </li>\r\n        </ul>\r\n      </div>\r\n      <div class=\"col-md-10\" style=\"padding: 0\">\r\n        <router-view></router-view>\r\n      </div>\r\n    </div>\r\n  </section>\r\n</template>\r\n"; });
define('text!nav-bar.html', ['module'], function(module) { module.exports = "<template bindable=\"router\">\r\n  <nav class=\"navbar navbar-default navbar-fixed-top\" role=\"navigation\">\r\n    <div class=\"navbar-header\">\r\n      <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\"#skeleton-navigation-navbar-collapse\">\r\n        <span class=\"sr-only\">Toggle Navigation</span>\r\n        <span class=\"icon-bar\"></span>\r\n        <span class=\"icon-bar\"></span>\r\n        <span class=\"icon-bar\"></span>\r\n      </button>\r\n      <a class=\"navbar-brand\" href=\"#\">\r\n        <i class=\"fa fa-home\"></i>\r\n        <span>${router.title}</span>\r\n      </a>\r\n    </div>\r\n\r\n    <div class=\"collapse navbar-collapse\" id=\"skeleton-navigation-navbar-collapse\">\r\n      <ul class=\"nav navbar-nav\">\r\n        <li repeat.for=\"row of router.navigation\" class=\"${row.isActive ? 'active' : ''}\">\r\n          <a data-toggle=\"collapse\" data-target=\"#skeleton-navigation-navbar-collapse.in\" href.bind=\"row.href\">${row.title}</a>\r\n        </li>\r\n      </ul>\r\n\r\n      <ul class=\"nav navbar-nav navbar-right\">\r\n        <li class=\"loader\" if.bind=\"router.isNavigating\">\r\n          <i class=\"fa fa-spinner fa-spin fa-2x\"></i>\r\n        </li>\r\n      </ul>\r\n    </div>\r\n  </nav>\r\n</template>\r\n"; });
define('text!users.html', ['module'], function(module) { module.exports = "<template>\r\n  <require from=\"./blur-image\"></require>\r\n\r\n  <section class=\"au-animate\">\r\n    <h2>${heading}</h2>\r\n    <div class=\"row au-stagger\">\r\n      <div class=\"col-sm-6 col-md-3 card-container au-animate\" repeat.for=\"user of users\">\r\n        <div class=\"card\">\r\n          <canvas class=\"header-bg\" width=\"250\" height=\"70\" blur-image.bind=\"image\"></canvas>\r\n          <div class=\"avatar\">\r\n            <img src.bind=\"user.avatar_url\" crossorigin ref=\"image\"/>\r\n          </div>\r\n          <div class=\"content\">\r\n            <p class=\"name\">${user.login}</p>\r\n            <p><a target=\"_blank\" class=\"btn btn-default\" href.bind=\"user.html_url\">Contact</a></p>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </section>\r\n</template>\r\n"; });
define('text!welcome.html', ['module'], function(module) { module.exports = "<template>\r\n  <section class=\"au-animate\">\r\n    <h2>${heading}</h2>\r\n    <form role=\"form\" submit.delegate=\"submit()\">\r\n      <div class=\"form-group\">\r\n        <label for=\"fn\">First Name</label>\r\n        <input type=\"text\" value.bind=\"firstName\" class=\"form-control\" id=\"fn\" placeholder=\"first name\">\r\n      </div>\r\n      <div class=\"form-group\">\r\n        <label for=\"ln\">Last Name</label>\r\n        <input type=\"text\" value.bind=\"lastName\" class=\"form-control\" id=\"ln\" placeholder=\"last name\">\r\n      </div>\r\n      <div class=\"form-group\">\r\n        <label>Full Name</label>\r\n        <p class=\"help-block\">${fullName | upper}</p>\r\n      </div>\r\n      <button type=\"submit\" class=\"btn btn-default\">Submit</button>\r\n    </form>\r\n  </section>\r\n</template>\r\n"; });
//# sourceMappingURL=app-bundle.js.map