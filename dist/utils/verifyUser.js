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
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUser = void 0;
const graph_1 = require("./graph");
const verifyUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.query.userId) {
        return res.status(404).json({ message: "Missing user information." });
    }
    const userId = req.query.userId;
    try {
        const user = yield graph_1.getUserDetails(req.app.locals.graphAccessToken, userId);
        if (!user) {
            return res
                .status(404)
                .json({ message: "User does not exist in current tenant." });
        }
        next();
    }
    catch (error) {
        return res.status(error.statusCode).json(JSON.parse(error.body));
    }
});
exports.verifyUser = verifyUser;
//# sourceMappingURL=verifyUser.js.map