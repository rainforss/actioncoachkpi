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
exports.getToken = exports.clientCredentialCrmRequest = exports.clientCredentialGraphRequest = void 0;
const index_1 = require("../index");
exports.clientCredentialGraphRequest = {
    scopes: ["https://graph.microsoft.com/.default"],
    azureRegion: "westus2",
    skipCache: true,
};
exports.clientCredentialCrmRequest = {
    scopes: ["https://actioncoachsystems.crm.dynamics.com/.default"],
    azureRegion: "westus2",
    skipCache: true,
};
const getToken = (app) => __awaiter(void 0, void 0, void 0, function* () {
    Promise.all([
        index_1.cca.acquireTokenByClientCredential(exports.clientCredentialGraphRequest),
        index_1.cca.acquireTokenByClientCredential(exports.clientCredentialCrmRequest),
    ])
        .then((responses) => {
        const [graph, dynamics] = responses;
        console.log(dynamics === null || dynamics === void 0 ? void 0 : dynamics.accessToken);
        app.locals.graphAccessToken = graph === null || graph === void 0 ? void 0 : graph.accessToken;
        app.locals.accessToken = dynamics === null || dynamics === void 0 ? void 0 : dynamics.accessToken;
    })
        .catch((err) => console.log(err));
});
exports.getToken = getToken;
//# sourceMappingURL=tokenRequest.js.map