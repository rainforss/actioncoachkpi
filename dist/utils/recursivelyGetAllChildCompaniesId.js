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
exports.recursivelyGetAllChildCompanies = void 0;
const actionCoachUser_1 = require("../webApis/actionCoachUser");
const recursivelyGetAllChildCompanies = (companies, parentComapnyIds, accessToken) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield actionCoachUser_1.actionCoachUser(accessToken).getChildCompaniesByParentCompanyIds(parentComapnyIds);
    const childCompanyIds = [];
    result.value.forEach((company) => {
        companies.push(company.ac_actioncoachpartnercompanyid);
        childCompanyIds.push(company.ac_actioncoachpartnercompanyid);
    });
    if (childCompanyIds.length !== 0) {
        return yield exports.recursivelyGetAllChildCompanies(companies, childCompanyIds, accessToken);
    }
    return companies;
});
exports.recursivelyGetAllChildCompanies = recursivelyGetAllChildCompanies;
//# sourceMappingURL=recursivelyGetAllChildCompaniesId.js.map