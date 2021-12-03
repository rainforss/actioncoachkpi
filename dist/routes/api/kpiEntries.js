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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const recursivelyGetAllChildCompaniesId_1 = require("../../utils/recursivelyGetAllChildCompaniesId");
const actionCoachUser_1 = require("../../webApis/actionCoachUser");
const kpiEntry_1 = require("../../webApis/kpiEntry");
const types_1 = require("../../types");
const cashbankEntry_1 = require("../../webApis/cashbankEntry");
const router = express_1.default.Router();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ac_submitter = req.query.acUserId;
        if (!ac_submitter) {
            return res.status(400).json({ message: "Missing ActionCoach User Id." });
        }
        const user = yield actionCoachUser_1.actionCoachUser(req.app.locals.accessToken).getAcPartnerById(ac_submitter);
        if (!user) {
            return res.status(404).json({
                message: `ID ${ac_submitter} does not correspond to an existing ActionCoach Partner profile.`,
            });
        }
        if (req.query.beginMonth &&
            req.query.beginYear &&
            req.query.endMonth &&
            req.query.endYear) {
            const result = yield kpiEntry_1.kpiEntry(req.app.locals.accessToken).getKpiEntryByAcUserAndTime(ac_submitter, req.query.beginMonth, req.query.beginYear, req.query.endMonth, req.query.endYear);
            return res.status(200).json(result.value);
        }
        const result = yield kpiEntry_1.kpiEntry(req.app.locals.accessToken).getKpiEntryByAcUser(ac_submitter);
        return res.status(200).json(result.value);
    }
    catch (error) {
        return res.status(400).json(error);
    }
}));
router.get("/aggregate", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const acMlId = req.query.acMlId;
        if (!acMlId) {
            if (req.query.beginMonth &&
                req.query.beginYear &&
                req.query.endMonth &&
                req.query.endYear) {
                const result = yield kpiEntry_1.kpiEntry(req.app.locals.accessToken).getKpiTotalForAllMlByTime(req.query.beginMonth, req.query.beginYear, req.query.endMonth, req.query.endYear);
                return res.status(200).json(result.value);
            }
            const result = yield kpiEntry_1.kpiEntry(req.app.locals.accessToken).getKpiTotalForAllMl();
            return res.status(200).json(result.value);
        }
        if (req.query.beginMonth &&
            req.query.beginYear &&
            req.query.endMonth &&
            req.query.endYear) {
            const result = yield kpiEntry_1.kpiEntry(req.app.locals.accessToken).getKpiTotalForMlByTime(acMlId, req.query.beginMonth, req.query.beginYear, req.query.endMonth, req.query.endYear);
            return res.status(200).json(result.value);
        }
        const result = yield kpiEntry_1.kpiEntry(req.app.locals.accessToken).getKpiTotalForMl(acMlId);
        return res.status(200).json(result.value);
    }
    catch (error) {
        return res.status(400).json(error);
    }
}));
router.get("/listall", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const acPartnerId = req.query.acPartnerId;
        if (!acPartnerId) {
            return res
                .status(400)
                .json({ message: "Missing ActionCoach Partner ID." });
        }
        const acPartner = yield actionCoachUser_1.actionCoachUser(req.app.locals.accessToken).getAcPartnerById(acPartnerId);
        if (acPartner._ac_partnertype_value === "6f95a9d6-29e4-eb11-bacb-002248086b38") {
            const companies = [acPartner._ac_partnercompany_value];
            const result = yield recursivelyGetAllChildCompaniesId_1.recursivelyGetAllChildCompanies(companies, [acPartner._ac_partnercompany_value], req.app.locals.accessToken);
            const coaches = yield actionCoachUser_1.actionCoachUser(req.app.locals.accessToken).getCoachesByPartnerCompanyIds(result);
            const acPartnerAndCoaches = [acPartner, ...coaches.value];
            if (req.query.beginMonth &&
                req.query.beginYear &&
                req.query.endMonth &&
                req.query.endYear) {
                const kpiEntries = yield kpiEntry_1.kpiEntry(req.app.locals.accessToken).getKpiEntriesByListOfAcPartnersAndTime(acPartnerAndCoaches, req.query.beginMonth, req.query.beginYear, req.query.endMonth, req.query.endYear);
                return res.status(200).json(kpiEntries.value);
            }
            const kpiEntries = yield kpiEntry_1.kpiEntry(req.app.locals.accessToken).getKpiEntriesByListOfAcPartners(acPartnerAndCoaches);
            return res.status(200).json(kpiEntries.value);
        }
        if (req.query.beginMonth &&
            req.query.beginYear &&
            req.query.endMonth &&
            req.query.endYear) {
            const kpiEntries = yield kpiEntry_1.kpiEntry(req.app.locals.accessToken).getKpiEntriesByListOfAcPartnersAndTime([acPartner], req.query.beginMonth, req.query.beginYear, req.query.endMonth, req.query.endYear);
            return res.status(200).json(kpiEntries.value);
        }
        const kpiEntries = yield kpiEntry_1.kpiEntry(req.app.locals.accessToken).getKpiEntriesByListOfAcPartners([acPartner]);
        return res.status(200).json(kpiEntries.value);
    }
    catch (error) {
        return res.status(400).json(error);
    }
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _a = req.body, { ac_submitter, cashBank } = _a, nonBindingData = __rest(_a, ["ac_submitter", "cashBank"]);
        const user = yield actionCoachUser_1.actionCoachUser(req.app.locals.accessToken).getAcPartnerById(ac_submitter);
        if (!user) {
            return res.status(400).json({
                message: `ID ${ac_submitter} does not correspond to an existing ActionCoach User.`,
            });
        }
        let seen = new Set();
        const hasDuplicates = cashBank.some((c) => seen.size === seen.add(c.coach).size);
        if (hasDuplicates) {
            return res.status(400).json({
                message: "Cash bank entries with duplicate ActionCOACH Partners are not allowed.",
            });
        }
        const lastDayOfMonth = new Date(nonBindingData.ac_year, nonBindingData.ac_month, 0).toISOString();
        const kpiEntryData = Object.assign({}, nonBindingData);
        kpiEntryData["ac_submissiondate"] = lastDayOfMonth;
        kpiEntryData["ac_Submitter@odata.bind"] = `/ac_actioncoachpartners(${ac_submitter})`;
        kpiEntryData["transactioncurrencyid@odata.bind"] = `/transactioncurrencies(${user.ac_PartnerCompany.transactioncurrencyid.transactioncurrencyid})`;
        kpiEntryData["ownerid@odata.bind"] = `/systemusers(${user._ownerid_value})`;
        const promises = [];
        cashBank.forEach((c) => {
            const newCashbank = new types_1.CashbankEntry();
            newCashbank["ac_Submitter@odata.bind"] = `/ac_actioncoachpartners(${c.coach})`;
            newCashbank["ownerid@odata.bind"] = `/systemusers(${user._ownerid_value})`;
            newCashbank["transactioncurrencyid@odata.bind"] = `/transactioncurrencies(${user.ac_PartnerCompany.transactioncurrencyid.transactioncurrencyid})`;
            newCashbank.ac_year = nonBindingData.ac_year;
            newCashbank.ac_month = nonBindingData.ac_month;
            newCashbank.ac_amount = c.value;
            newCashbank.ac_submissiondate = lastDayOfMonth;
            promises.push(cashbankEntry_1.cashbankEntry(req.app.locals.accessToken).createCashbankEntry(newCashbank));
        });
        promises.push(kpiEntry_1.kpiEntry(req.app.locals.accessToken).createKpiEntry(kpiEntryData));
        const result = yield Promise.all(promises);
        return res.status(200).json(result);
    }
    catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
}));
exports.default = router;
//# sourceMappingURL=kpiEntries.js.map