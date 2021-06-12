"use strict";

define(["require", "exports", "./application", "./data-loader"], function (require, exports, application_1, data_loader_1) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.dataLoader = exports.Page = exports.Application = void 0;
  Object.defineProperty(exports, "Application", {
    enumerable: true,
    get: function get() {
      return application_1.Application;
    }
  });
  Object.defineProperty(exports, "Page", {
    enumerable: true,
    get: function get() {
      return application_1.Page;
    }
  });
  Object.defineProperty(exports, "dataLoader", {
    enumerable: true,
    get: function get() {
      return data_loader_1.dataLoader;
    }
  });
});
//# sourceMappingURL=index.js.map
