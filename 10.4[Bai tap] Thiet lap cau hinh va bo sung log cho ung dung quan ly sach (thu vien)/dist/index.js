"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const winston_1 = require("./src/logger/winston");
const express_error_slack_1 = __importDefault(require("express-error-slack"));
const PORT = 3000;
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.get('/', (req, res) => {
    try {
        res.end("<h1>Hello winston!</h1>");
        throw new Error("Error test winston");
    }
    catch (err) {
        winston_1.logger.error(err);
        res.redirect('/error');
    }
});
app.post('/', (req, res, next) => {
    try {
        if (!req.body.username || !req.body.password) {
            next(new Error("invalid value"));
        }
        else {
            res.status(200).send({ message: "you are authorized" });
        }
    }
    catch (err) {
        next(err);
    }
});
app.use((err, req, res, next) => {
    res.status(500).send(err.message);
    throw new Error(err);
});
app.use((0, express_error_slack_1.default)({ webhookUri: 'https://hooks.slack.com/services/xapp-1-A03NW688HRB-3781069230899-dbed7c75ce1b47f990c58a612180d7829cb8207b1490c70094a438248c1967ee' }));
app.listen(PORT, () => {
    console.log("App running on port: " + PORT);
});
//# sourceMappingURL=index.js.map