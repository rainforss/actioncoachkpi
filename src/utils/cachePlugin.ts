import { TokenCacheContext } from "@azure/msal-node";
import fs from "fs/promises";

const cachePath = "./cache.json";

const beforeCacheAccess = async (cacheContext: TokenCacheContext) => {
  cacheContext.tokenCache.deserialize(await fs.readFile(cachePath, "utf-8"));
};

const afterCacheAccess = async (cacheContext: TokenCacheContext) => {
  if (cacheContext.cacheHasChanged) {
    await fs.writeFile(cachePath, cacheContext.tokenCache.serialize());
  }
};

export const cachePlugin = { beforeCacheAccess, afterCacheAccess };
