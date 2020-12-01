"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
function createLogger(name) {
    return winston_1.createLogger(Object.assign({ exitOnError: false, transports: [
            new winston_1.transports.Console({
                level: 'debug',
                handleExceptions: true,
            }),
        ] }, (name && {
        defaultMeta: {
            service: name,
        },
    })));
}
exports.default = createLogger;
//# sourceMappingURL=createLogger.js.map