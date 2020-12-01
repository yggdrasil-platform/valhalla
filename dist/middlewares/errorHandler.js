"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Simple error handling middleware.
 */
const errorHandler = (logger) => (error, req, res, next) => {
    let status;
    if (error) {
        logger.error(error.message);
        status = error.status || 500;
        return res.status(status).json({
            status,
            message: error.message,
        });
    }
    return next(error);
};
exports.default = errorHandler;
//# sourceMappingURL=errorHandler.js.map