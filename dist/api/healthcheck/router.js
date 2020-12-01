"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// Controllers.
const controller_1 = __importDefault(require("./controller"));
function router(route, options) {
    const controller = new controller_1.default(options);
    return express_1.Router().get('/', controller.get.bind(controller));
}
exports.default = router;
//# sourceMappingURL=router.js.map