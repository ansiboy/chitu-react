(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./application", "./data-page", "./css/index.css"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var application_1 = require("./application");
    exports.Application = application_1.Application;
    exports.Page = application_1.Page;
    var data_page_1 = require("./data-page");
    exports.dataPage = data_page_1.dataPage;
    require("./css/index.css");
});
