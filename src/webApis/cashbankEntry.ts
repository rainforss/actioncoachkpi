import { CashbankEntry } from "../types";
import fetch from "../utils/nodeFetchJson";

export const cashbankEntry = (accessToken: string) => {
  return {
    createCashbankEntry: async (cashbankEntry: CashbankEntry) => {
      try {
        const ac_submitter_id = cashbankEntry["ac_Submitter@odata.bind"]
          .split("(")[1]
          .slice(0, -1);
        const existingEntries = await fetch(
          `${process.env.DYNAMICS_CRM_ROOT_URL}/api/data/v9.0/ac_cashbankentries?$filter=_ac_submitter_value eq ${ac_submitter_id} and ac_month eq ${cashbankEntry.ac_month} and ac_year eq ${cashbankEntry.ac_year}&$select=ac_month,ac_year&$expand=ac_Submitter($select=ac_name)`,
          {
            headers: {
              "Content-Type": "application/json",
              "OData-Version": "4.0",
              Accept: "application/json",
              Prefer: "return=representation",
              Authorization: `Bearer ${accessToken}`,
            },
            method: "GET",
          }
        );
        if (existingEntries.value.length > 0) {
          return {
            warning: `Cash bank for ${existingEntries.value[0].ac_Submitter.ac_name} of ${cashbankEntry.ac_month} ${cashbankEntry.ac_year} already exists.`,
          };
        }

        const result = await fetch(
          `${process.env.DYNAMICS_CRM_ROOT_URL}/api/data/v9.0/ac_cashbankentries?$select=ac_month,ac_year`,
          {
            headers: {
              "Content-Type": "application/json",
              "OData-Version": "4.0",
              Accept: "application/json",
              Prefer: "return=representation",
              Authorization: `Bearer ${accessToken}`,
            },
            method: "POST",
            body: JSON.stringify(cashbankEntry),
          }
        );
        return result;
      } catch (error) {
        throw error;
      }
    },
  };
};
