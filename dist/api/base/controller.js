"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Errors.
const errors_1 = require("../../errors");
class Controller {
    constructor(options) {
        this.logger = options.logger;
    }
    handleError(error, next) {
        if (error instanceof errors_1.RequestError) {
            return next(error);
        }
        // Wrap all other errors as a 500 RequestError.
        return next(new errors_1.RequestError(500, error.message));
    }
}
exports.default = Controller;
//# sourceMappingURL=controller.js.map