"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const envConfig_1 = require("./config/envConfig");
const auth_route_1 = __importDefault(require("./routes/auth.route"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = envConfig_1.PORT || 8000;
        this.middlewares();
        this.routes();
    }
    middlewares() {
        this.app.use((0, cors_1.default)());
        this.app.use((0, helmet_1.default)());
        this.app.use(express_1.default.json());
    }
    routes() {
        this.app.use("/api", (req, res) => {
            res.status(200).send("connected");
        });
        this.app.use("/auth", new auth_route_1.default().getRoute());
    }
    start() {
        this.app.listen(this.port, () => {
            console.log(`Server started on port ${this.port}`);
        });
    }
}
exports.default = Server;
