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
exports.kpiEntry = void 0;
const fetchXML_1 = require("../utils/fetchXML");
const nodeFetchJson_1 = __importDefault(require("../utils/nodeFetchJson"));
const kpiEntry = (accessToken) => {
    return {
        createKpiEntry: (kpiEntry) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const ac_submitter_id = kpiEntry["ac_Submitter@odata.bind"]
                    .split("(")[1]
                    .slice(0, -1);
                const existingEntries = yield nodeFetchJson_1.default(`${process.env.DYNAMICS_CRM_ROOT_URL}/api/data/v9.0/ac_kpientries?$filter=_ac_submitter_value eq ${ac_submitter_id} and ac_month eq ${kpiEntry.ac_month} and ac_year eq ${kpiEntry.ac_year}&$select=ac_month,ac_year&$expand=ac_Submitter($select=ac_name)`, {
                    headers: {
                        "Content-Type": "application/json",
                        "OData-Version": "4.0",
                        Accept: "application/json",
                        Prefer: "return=representation",
                        Authorization: `Bearer ${accessToken}`,
                    },
                    method: "GET",
                });
                if (existingEntries.value.length > 0) {
                    return {
                        warning: `KPI for ${existingEntries.value[0].ac_Submitter.ac_name} of ${kpiEntry.ac_month} ${kpiEntry.ac_year} already exists.`,
                    };
                }
                const result = yield nodeFetchJson_1.default(`${process.env.DYNAMICS_CRM_ROOT_URL}/api/data/v9.0/ac_kpientries?$select=ac_month,ac_year`, {
                    headers: {
                        "Content-Type": "application/json",
                        "OData-Version": "4.0",
                        Accept: "application/json",
                        Prefer: "return=representation",
                        Authorization: `Bearer ${accessToken}`,
                    },
                    method: "POST",
                    body: JSON.stringify(kpiEntry),
                });
                return result;
            }
            catch (error) {
                throw error;
            }
        }),
        getKpiEntryByAcUser: (acUserId) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const result = yield nodeFetchJson_1.default(`${process.env.DYNAMICS_CRM_ROOT_URL}/api/data/v9.0/ac_kpientries?$orderby=createdon desc&$filter=_ac_submitter_value eq ${acUserId}&$select=ac_month,ac_year,ac_totalmarketinginvestment,ac_numberofleadtotal,ac_numberofondeckcalls,ac_numberofdiagnostics,ac_numberofnewclients&$top=5&$expand=ac_Submitter($select=ac_name),transactioncurrencyid($select=isocurrencycode)`, {
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
        getKpiEntryByAcUserAndTime: (acUserId, beginMonth, beginYear, endMonth, endYear) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const result = yield nodeFetchJson_1.default(`${process.env.DYNAMICS_CRM_ROOT_URL}/api/data/v9.0/ac_kpientries?$orderby=createdon desc&$filter=_ac_submitter_value eq ${acUserId} and ac_month ge ${beginMonth} and ac_month le ${endMonth} and ac_year ge ${beginYear} and ac_year le ${endYear}&$select=ac_month,ac_year,ac_totalmarketinginvestment,ac_numberofleadtotal,ac_numberofondeckcalls,ac_numberofdiagnostics,ac_numberofnewclients&$expand=ac_Submitter($select=ac_name),transactioncurrencyid($select=isocurrencycode)`, {
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
        getKpiEntriesByListOfAcPartners: (acPartners) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const filters = [];
                acPartners.forEach((ac) => {
                    filters.push(`_ac_submitter_value eq ${ac.ac_actioncoachpartnerid}`);
                });
                const filterString = filters.join(" or ");
                const result = yield nodeFetchJson_1.default(`${process.env.DYNAMICS_CRM_ROOT_URL}/api/data/v9.0/ac_kpientries?$orderby=_ac_submitter_value asc&$filter=${filterString}&$select=ac_month,ac_year,ac_totalmarketinginvestment,ac_cashbank,ac_numberofleadtotal,ac_numberofondeckcalls,ac_numberofdiagnostics,ac_numberofnewclients&$expand=ac_Submitter($select=ac_name),transactioncurrencyid($select=isocurrencycode)`, {
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
        getKpiEntriesByListOfAcPartnersAndTime: (acPartners, beginMonth, beginYear, endMonth, endYear) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const filters = [];
                acPartners.forEach((ac) => {
                    filters.push(`_ac_submitter_value eq ${ac.ac_actioncoachpartnerid}`);
                });
                const filterString = filters.join(" or ");
                const result = yield nodeFetchJson_1.default(`${process.env.DYNAMICS_CRM_ROOT_URL}/api/data/v9.0/ac_kpientries?$orderby=_ac_submitter_value asc&$filter=(${filterString}) and ac_month ge ${beginMonth} and ac_month le ${endMonth} and ac_year ge ${beginYear} and ac_year le ${endYear}&$select=ac_month,ac_year,ac_totalmarketinginvestment,ac_cashbank,ac_numberofleadtotal,ac_numberofondeckcalls,ac_numberofdiagnostics,ac_numberofnewclients&$expand=ac_Submitter($select=ac_name),transactioncurrencyid($select=isocurrencycode)`, {
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
        getKpiTotalForMlByTime: (acMlId, beginMonth, beginYear, endMonth, endYear) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const result = yield nodeFetchJson_1.default(`${process.env.DYNAMICS_CRM_ROOT_URL}/api/data/v9.0/ac_kpientries?fetchXml=${encodeURI(fetchXML_1.KpiTotalForMlByTime(acMlId, beginMonth, beginYear, endMonth, endYear))}`, {
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
        getKpiListForMlByTime: (acMlId, beginMonth, beginYear, endMonth, endYear) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const result = yield nodeFetchJson_1.default(`${process.env.DYNAMICS_CRM_ROOT_URL}/api/data/v9.0/ac_kpientries?fetchXml=${encodeURI(fetchXML_1.ListOfKpiForMlAndSubUserByTime(acMlId, beginMonth, beginYear, endMonth, endYear))}`, {
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
        getKpiListForMl: (acMlId) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const result = yield nodeFetchJson_1.default(`${process.env.DYNAMICS_CRM_ROOT_URL}/api/data/v9.0/ac_kpientries?fetchXml=${encodeURI(fetchXML_1.ListOfKpiForMlAndSubUser(acMlId))}`, {
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
        getKpiTotalForMl: (acMlId) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const result = yield nodeFetchJson_1.default(`${process.env.DYNAMICS_CRM_ROOT_URL}/api/data/v9.0/ac_kpientries?$apply=filter(ac_Submitter/_ac_parentactioncoachuser_value eq ${acMlId} or _ac_submitter_value eq ${acMlId})/aggregate(ac_totalmarketinginvestment with sum as cashbanktotal,ac_numberofleadtotal with sum as totallead,ac_numberofondeckcalls with sum as totalondeckcalls,ac_numberofdiagnostics with sum as totaldiagnostics,ac_numberofnewclients with sum as totalnewclients)`, {
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
        getKpiTotalForAllMlByTime: (beginMonth, beginYear, endMonth, endYear) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const result = yield nodeFetchJson_1.default(`${process.env.DYNAMICS_CRM_ROOT_URL}/api/data/v9.0/ac_kpientries?fetchXml=${encodeURI(fetchXML_1.GroupAllKpiEntriesBySubmitterParentUserAndFilterByTime(beginMonth, beginYear, endMonth, endYear))}`, {
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
        getKpiTotalForAllMl: () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const result = yield nodeFetchJson_1.default(`${process.env.DYNAMICS_CRM_ROOT_URL}/api/data/v9.0/ac_kpientries?fetchXml=${encodeURI(fetchXML_1.GroupAllKpiEntriesBySubmitterParentUser)}`, {
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
exports.kpiEntry = kpiEntry;
//# sourceMappingURL=kpiEntry.js.map