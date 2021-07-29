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
exports.actionCoachUser = void 0;
const nodeFetchJson_1 = __importDefault(require("../utils/nodeFetchJson"));
const actionCoachUser = (accessToken) => {
    return {
        getAcPartnerByEmail: (email) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const result = yield nodeFetchJson_1.default(`${process.env.DYNAMICS_CRM_ROOT_URL}/api/data/v9.0/ac_actioncoachpartners?$filter=ac_email eq '${email}'&$select=ac_name,_ac_partnercompany_value,_ac_partnertype_value,_ownerid_value&$expand=ac_PartnerCompany($select=ac_name;$expand=transactioncurrencyid($select=isocurrencycode)),ac_PartnerType($select=ac_name)`, {
                    headers: {
                        "Content-Type": "application/json",
                        "OData-Version": "4.0",
                        Accept: "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                    method: "GET",
                });
                return result;
            }
            catch (error) {
                throw error;
            }
        }),
        getAcPartnerById: (acPartnerId) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const result = yield nodeFetchJson_1.default(`${process.env.DYNAMICS_CRM_ROOT_URL}/api/data/v9.0/ac_actioncoachpartners(${acPartnerId})?$select=ac_name,_ac_partnercompany_value,_ac_partnertype_value,_ownerid_value&$expand=ac_PartnerCompany($select=ac_name;$expand=transactioncurrencyid($select=isocurrencycode)),ac_PartnerType($select=ac_name)`, {
                    headers: {
                        "Content-Type": "application/json",
                        "OData-Version": "4.0",
                        Accept: "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                    method: "GET",
                });
                return result;
            }
            catch (error) {
                throw error;
            }
        }),
        getCoachesByPartnerCompanyIds: (companyIds) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const filters = [];
                companyIds.forEach((Id) => {
                    filters.push(`_ac_partnercompany_value eq ${Id}`);
                });
                const filterString = filters.join(" or ");
                const result = yield nodeFetchJson_1.default(`${process.env.DYNAMICS_CRM_ROOT_URL}/api/data/v9.0/ac_actioncoachpartners?$filter=(${filterString}) and _ac_partnertype_value eq '27f7dce2-29e4-eb11-bacb-002248086b38'&$select=ac_name`, {
                    headers: {
                        "Content-Type": "application/json",
                        "OData-Version": "4.0",
                        Accept: "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                    method: "GET",
                });
                return result;
            }
            catch (error) {
                throw error;
            }
        }),
        getChildCompaniesByParentCompanyIds: (parentCompanyIds) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const filters = [];
                parentCompanyIds.forEach((Id) => {
                    filters.push(`_ac_parentpartnercompany_value eq ${Id}`);
                });
                const filterString = filters.join(" or ");
                const result = yield nodeFetchJson_1.default(`${process.env.DYNAMICS_CRM_ROOT_URL}/api/data/v9.0/ac_actioncoachpartnercompanies?$filter=${filterString}&$select=ac_name`, {
                    headers: {
                        "Content-Type": "application/json",
                        "OData-Version": "4.0",
                        Accept: "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                    method: "GET",
                });
                return result;
            }
            catch (error) {
                throw error;
            }
        }),
    };
};
exports.actionCoachUser = actionCoachUser;
//# sourceMappingURL=actionCoachUser.js.map