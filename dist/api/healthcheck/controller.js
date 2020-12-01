"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Controllers.
const controller_1 = __importDefault(require("../base/controller"));
class Controller extends controller_1.default {
    get(req, res) {
        res.status(200).send('OK').end();
    }
}
exports.default = Controller;
//# sourceMappingURL=controller.js.map