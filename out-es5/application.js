"use strict";

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Application = exports.Page = void 0;

var React = require("react");

var ReactDOM = require("react-dom");

var chitu = require("maishu-chitu");

var errors_1 = require("./errors");

var data_loader_1 = require("./data-loader");

var Page =
/*#__PURE__*/
function (_chitu$Page) {
  _inherits(Page, _chitu$Page);

  function Page() {
    var _this;

    _classCallCheck(this, Page);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Page).apply(this, arguments));
    _this.component = null;
    return _this;
  }

  return Page;
}(chitu.Page);

exports.Page = Page;

var DefaultPageNodeParser =
/*#__PURE__*/
function () {
  function DefaultPageNodeParser(modulesPath) {
    _classCallCheck(this, DefaultPageNodeParser);

    this.nodes = {};
    this.modulesPath = modulesPath.endsWith("/") ? modulesPath.substr(0, modulesPath.length - 1) : modulesPath;
  }

  _createClass(DefaultPageNodeParser, [{
    key: "parse",
    value: function parse(pageName) {
      var _this2 = this;

      var node = this.nodes[pageName];

      if (node == null) {
        var path = "".concat(pageName).split('_').join('/');

        if (this.modulesPath) {
          path = "".concat(this.modulesPath, "/").concat(path);
        }

        node = {
          action: this.createDefaultAction(path, function (path) {
            return _this2.loadjs(path);
          }),
          name: pageName
        };
        this.nodes[pageName] = node;
      }

      return node;
    }
  }, {
    key: "createDefaultAction",
    value: function createDefaultAction(url, loadjs) {
      var _this3 = this;

      return function (page, app) {
        return __awaiter(_this3, void 0, void 0,
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee() {
          var actionExports, action, props, loadProps, partialProps, loadData, partialData, element, component;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return loadjs(url);

                case 2:
                  actionExports = _context.sent;

                  if (actionExports) {
                    _context.next = 5;
                    break;
                  }

                  throw errors_1.Errors.exportsCanntNull(url);

                case 5:
                  action = actionExports.default;

                  if (!(action == null)) {
                    _context.next = 8;
                    break;
                  }

                  throw errors_1.Errors.canntFindAction(page.name);

                case 8:
                  props = {
                    app: app,
                    data: page.data,
                    events: {
                      shown: page.shown,
                      showing: page.showing,
                      hidden: page.hidden,
                      hiding: page.hiding
                    },
                    source: page,
                    createService: function createService(type) {
                      return page.createService(type);
                    }
                  };
                  loadProps = actionExports.loadProps;

                  if (!(typeof loadProps == "function")) {
                    _context.next = 15;
                    break;
                  }

                  _context.next = 13;
                  return loadProps(page.data, app);

                case 13:
                  partialProps = _context.sent;
                  props = Object.assign(props, partialProps || {});

                case 15:
                  loadData = actionExports.loadData || action[data_loader_1.LOAD_DATA];

                  if (!(typeof loadData == "function")) {
                    _context.next = 21;
                    break;
                  }

                  _context.next = 19;
                  return loadData(props);

                case 19:
                  partialData = _context.sent;
                  Object.assign(props.data, partialData);

                case 21:
                  element = React.createElement(action, props);
                  component = ReactDOM.render(element, page.element); // let component = ReactDOM.hydrate(element, page.element) as React.Component;

                  page.component = component;

                case 24:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));
      };
    }
  }]);

  return DefaultPageNodeParser;
}();

var TargetUrlVariableName = "targetUrl";
var DefaultPage = "index";

var Application =
/*#__PURE__*/
function (_chitu$Application) {
  _inherits(Application, _chitu$Application);

  function Application(args) {
    var _this4;

    _classCallCheck(this, Application);

    args = args || {};

    if (args.modulesPath === undefined) {
      args.modulesPath = "modules";
    }

    if (!args.parser) args.parser = Application.createPageNodeParser(args.modulesPath);
    _this4 = _possibleConstructorReturn(this, _getPrototypeOf(Application).call(this, args));
    args.parser.app = _assertThisInitialized(_this4);

    args.parser.loadjs = function (path) {
      return _this4.loadjs(path);
    };

    _this4.defaultPage = args.defaultPage || DefaultPage;
    _this4.pageType = Page;
    var mode = args.mode || "hash";

    if (mode == "history") {
      _this4.run = function () {
        var routeString = _this4.getRouteString();

        _this4.showPage(routeString);
      };

      _this4.parseUrl = function (url) {
        var searchIndex = url.indexOf("?");
        var search;
        var pathName;

        if (searchIndex > 0) {
          search = url.substr(searchIndex);
          pathName = url.substr(0, searchIndex);
        } else {
          pathName = url;
        }

        var routers = args === null || args === void 0 ? void 0 : args.routers;
        var values = {};

        if (routers != null) {
          for (var i = 0; i < routers.length; i++) {
            var m = routers[i].match(pathName);

            if (m) {
              var controller = m.controller,
                  action = m.action;
              if (!controller) throw new Error("Can not get controller from route data.");
              if (!action) throw new Error("Can not get action from route data.");
              Object.assign(values, m);
              break;
            }
          }
        }

        if (search) {
          var q = search.substr(1);
          var r = q ? _this4.pareeUrlQuery(q) : {};
          Object.assign(values, r);
        }

        var arr = pathName.split("/").filter(function (o) {
          return o;
        });
        var pageName = arr.length == 0 ? "index" : arr.join("_");
        return {
          pageName: pageName,
          values: values
        };
      };
    }

    return _this4;
  }

  _createClass(Application, [{
    key: "createPageElement",
    value: function createPageElement(pageName, containerName) {
      var container = this.containers[containerName];
      if (container == null) throw errors_1.Errors.containerNotExist(containerName);
      var e = container.querySelector("[name=\"".concat(pageName, "\"]"));

      if (e == null) {
        e = _get(_getPrototypeOf(Application.prototype), "createPageElement", this).call(this, pageName, containerName);
        e.setAttribute("name", pageName);
      }

      return e;
    }
  }, {
    key: "getRouteString",
    value: function getRouteString() {
      var routeString = window[TargetUrlVariableName];

      if (!routeString) {
        routeString = location.pathname || this.defaultPage;

        if (location.search) {
          routeString = routeString + location.search;
        }
      }

      routeString = routeString.trim();

      if (routeString[0] == '/') {
        routeString = routeString.substr(1);
      }

      return routeString;
    }
  }], [{
    key: "createPageNodeParser",
    value: function createPageNodeParser(modulesPath) {
      var p = new DefaultPageNodeParser(modulesPath);
      return p;
    }
  }]);

  return Application;
}(chitu.Application);

exports.Application = Application;
//# sourceMappingURL=application.js.map
