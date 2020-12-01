"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RequestError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}
exports.default = RequestError;
//# sourceMappingURL=RequestError.js.map