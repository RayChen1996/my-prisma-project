"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Express API with Swagger",
            version: "1.0.0",
        },
        components: {
            schemas: {
                User: {
                    type: "object",
                    properties: {
                        id: {
                            type: "string",
                        },
                        name: {
                            type: "string",
                        },
                        email: {
                            type: "string",
                        },
                        password: {
                            type: "string",
                        },
                    },
                },
                Reader: {
                    type: "object",
                    properties: {
                        id: {
                            type: "string",
                        },
                        userId: {
                            type: "string",
                        },
                        bookTitle: {
                            type: "string",
                        },
                        progress: {
                            type: "integer",
                        },
                    },
                },
            },
        },
    },
    apis: ["./src/routes/*.ts"],
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
const setupSwagger = (app) => {
    app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
};
exports.default = setupSwagger;
