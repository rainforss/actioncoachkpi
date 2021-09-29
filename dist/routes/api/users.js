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
const constants_1 = require("../../utils/constants");
const recursivelyGetAllChildCompaniesId_1 = require("../../utils/recursivelyGetAllChildCompaniesId");
const actionCoachUser_1 = require("../../webApis/actionCoachUser");
const router = express_1.default.Router();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.query.email) {
            return res
                .status(400)
                .json({ message: "Missing user email information." });
        }
        const user = yield actionCoachUser_1.actionCoachUser(req.app.locals.accessToken).getAcPartnerByEmail(req.query.email);
        if (user.value.length === 0) {
            return res.status(404).json({
                message: `You are not an ActionCoach User.`,
            });
        }
        return res.status(200).json(user.value);
    }
    catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
}));
router.get("/:acPartnerId/coaches", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const acPartnerId = req.params.acPartnerId;
        const acPartner = yield actionCoachUser_1.actionCoachUser(req.app.locals.accessToken).getAcPartnerById(acPartnerId);
        if (acPartner._ac_partnertype_value !== constants_1.MASTER_LICENSEE_TYPE) {
            return res.status(200).json([]);
        }
        const companies = [acPartner._ac_partnercompany_value];
        const result = yield recursivelyGetAllChildCompaniesId_1.recursivelyGetAllChildCompanies(companies, [acPartner._ac_partnercompany_value], req.app.locals.accessToken);
        const coaches = yield actionCoachUser_1.actionCoachUser(req.app.locals.accessToken).getCoachesByPartnerCompanyIds(result);
        return res.status(200).json(coaches.value);
    }
    catch (error) {
        return res.status(400).json(error);
    }
}));
exports.default = router;
//# sourceMappingURL=users.js.map