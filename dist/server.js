"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressServer = void 0;
const body_parser_1 = require("body-parser");
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const morgan_1 = __importDefault(require("morgan"));
const os_1 = require("os");
// Constants.
const constants_1 = require("./constants");
// Middlewares.
const middlewares_1 = require("./middlewares");
// Modules.
const logger_1 = require("./modules/logger");
// Routers.
const router_1 = __importDefault(require("./api/healthcheck/router"));
class ExpressServer {
    constructor() {
        this.app = express_1.default();
        this.logger = logger_1.createLogger(process.env.SERVICE_NAME);
    }
    /**
     * Configures the application.
     */
    config() {
        return __awaiter(this, void 0, void 0, function* () {
            // Setup middleware.
            this.app.use(morgan_1.default('combined', {
                stream: {
                    write: (message) => {
                        this.logger.info(message);
                    },
                },
            }));
            this.app.use(body_parser_1.json());
            this.app.use(body_parser_1.urlencoded({ extended: true }));
            this.app.enable('case sensitive routing');
            this.app.enable('strict routing');
        });
    }
    /**
     * Convenience function that simply runs Express.listen() and wraps it in a promise with logging.
     * @param {string | number} port
     */
    listen(port) {
        return new Promise((resolve) => {
            http_1.createServer(this.app).listen(port, () => {
                this.logger.info(`up and running in ${process.env.NODE_ENV} @: ${os_1.hostname()} on port: ${port}}`);
                resolve();
            });
        });
    }
    /**
     * Sets up all the routes.
     */
    initRoutes() {
        const options = {
            logger: this.logger,
        };
        // Add routes.
        this.app.use(constants_1.Endpoints.HEALTHCHECK, router_1.default(constants_1.Endpoints.HEALTHCHECK, options));
        // Error handling.
        this.app.use(middlewares_1.errorHandler(this.logger));
    }
}
exports.ExpressServer = ExpressServer;
//# sourceMappingURL=server.js.map