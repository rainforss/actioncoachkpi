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
exports.cashbankEntry = void 0;
const nodeFetchJson_1 = __importDefault(require("../utils/nodeFetchJson"));
const cashbankEntry = (accessToken) => {
    return {
        createCashbankEntry: (cashbankEntry) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const ac_submitter_id = cashbankEntry["ac_Submitter@odata.bind"]
                    .split("(")[1]
                    .slice(0, -1);
                const existingEntries = yield nodeFetchJson_1.default(`${process.env.DYNAMICS_CRM_ROOT_URL}/api/data/v9.0/ac_cashbankentries?$filter=_ac_submitter_value eq ${ac_submitter_id} and ac_month eq ${cashbankEntry.ac_month} and ac_year eq ${cashbankEntry.ac_year}&$select=ac_month,ac_year&$expand=ac_Submitter($select=ac_name)`, {
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
                        warning: `Cash bank for ${existingEntries.value[0].ac_Submitter.ac_name} of ${cashbankEntry.ac_month} ${cashbankEntry.ac_year} already exists.`,
                    };
                }
                const result = yield nodeFetchJson_1.default(`${process.env.DYNAMICS_CRM_ROOT_URL}/api/data/v9.0/ac_cashbankentries?$select=ac_month,ac_year`, {
                    headers: {
                        "Content-Type": "application/json",
                        "OData-Version": "4.0",
                        Accept: "application/json",
                        Prefer: "return=representation",
                        Authorization: `Bearer ${accessToken}`,
                    },
                    method: "POST",
                    body: JSON.stringify(cashbankEntry),
                });
                return result;
            }
            catch (error) {
                throw error;
            }
        }),
    };
};
exports.cashbankEntry = cashbankEntry;
//# sourceMappingURL=cashbankEntry.js.map