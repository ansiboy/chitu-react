"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LOAD_PROPS = exports.dataLoader = exports.LOAD_DATA = void 0;
exports.LOAD_DATA = "loadData";

function dataLoader(loadData) {
  return function (constructor) {
    constructor[exports.LOAD_DATA] = loadData;
    return constructor;
  };
}

exports.dataLoader = dataLoader;
exports.LOAD_PROPS = "loadProps";
//# sourceMappingURL=data-loader.js.map
