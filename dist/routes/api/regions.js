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
const express_1 = __importDefault(require("express"));
require("isomorphic-fetch");
const nodeFetchJson_1 = __importDefault(require("../../utils/nodeFetchJson"));
const router = express_1.default.Router();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield nodeFetchJson_1.default("https://actioncoachsystems.crm.dynamics.com/api/data/v9.1/ac_regions?$select=ac_name&$filter=statecode%20eq%200&$count=true", { headers: { authorization: `Bearer ${req.app.locals.accessToken}` } });
        return res.status(200).json(result);
    }
    catch (error) {
        return res.status(error.response.status).json(error.data);
    }
}));
exports.default = router;
//# sourceMappingURL=regions.js.map