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
exports.cachePlugin = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const cachePath = "./cache.json";
const beforeCacheAccess = (cacheContext) => __awaiter(void 0, void 0, void 0, function* () {
    cacheContext.tokenCache.deserialize(yield promises_1.default.readFile(cachePath, "utf-8"));
});
const afterCacheAccess = (cacheContext) => __awaiter(void 0, void 0, void 0, function* () {
    if (cacheContext.cacheHasChanged) {
        yield promises_1.default.writeFile(cachePath, cacheContext.tokenCache.serialize());
    }
});
exports.cachePlugin = { beforeCacheAccess, afterCacheAccess };
//# sourceMappingURL=cachePlugin.js.map