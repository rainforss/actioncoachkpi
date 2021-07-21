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
exports.getUserDetails = void 0;
const microsoft_graph_client_1 = require("@microsoft/microsoft-graph-client");
require("isomorphic-fetch");
const getAuthenticatedClient = (accessToken) => {
    const client = microsoft_graph_client_1.Client.init({
        authProvider: (done) => {
            done(null, accessToken);
        },
    });
    return client;
};
const getUserDetails = (accessToken, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const client = getAuthenticatedClient(accessToken);
    try {
        const user = yield client.api(`/users/${userId}`).get();
        return user;
    }
    catch (error) {
        throw error;
    }
});
exports.getUserDetails = getUserDetails;
//# sourceMappingURL=graph.js.map