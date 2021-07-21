import { KpiEntry } from "../types";
import {
  GroupAllKpiEntriesBySubmitterParentUser,
  GroupAllKpiEntriesBySubmitterParentUserAndFilterByTime,
  KpiTotalForMlByTime,
  ListOfKpiForMlAndSubUser,
  ListOfKpiForMlAndSubUserByTime,
} from "../utils/fetchXML";
import fetch from "../utils/nodeFetchJson";

// export const createKpiEntry = async (
//   kpiEntry: KpiEntry,
//   accessToken: string
// ) => {
//   const result = await fetch(
//     `${process.env.DYNAMICS_CRM_ROOT_URL}/api/data/v9.0/ac_kpientries?$select=ac_month,ac_year`,
//     {
//       headers: {
//         "Content-Type": "application/json",
//         "OData-Version": "4.0",
//         Accept: "application/json",
//         Prefer: "return=representation",
//         Authorization: `Bearer ${accessToken}`,
//       },
//       method: "POST",
//       body: JSON.stringify(kpiEntry),
//     }
//   );
//   return result;
// };

export const kpiEntry = (accessToken: string) => {
  return {
    createKpiEntry: async (kpiEntry: KpiEntry) => {
      try {
        const result = await fetch(
          `${process.env.DYNAMICS_CRM_ROOT_URL}/api/data/v9.0/ac_kpientries?$select=ac_month,ac_year`,
          {
            headers: {
              "Content-Type": "application/json",
              "OData-Version": "4.0",
              Accept: "application/json",
              Prefer: "return=representation",
              Authorization: `Bearer ${accessToken}`,
            },
            method: "POST",
            body: JSON.stringify(kpiEntry),
          }
        );
        return result;
      } catch (error) {
        throw error;
      }
    },
    getKpiEntryByAcUser: async (acUserId: string) => {
      try {
        const result = await fetch(
          `${process.env.DYNAMICS_CRM_ROOT_URL}/api/data/v9.0/ac_kpientries?$orderby=createdon desc&$filter=_ac_submitter_value eq ${acUserId}&$select=ac_month,ac_year,ac_totalmarketinginvestment,ac_numberofleadtotal,ac_numberofondeckcalls,ac_numberofdiagnostics,ac_numberofnewclients&$top=5&$expand=ac_Submitter($select=ac_name),transactioncurrencyid($select=isocurrencycode)`,
          {
            headers: {
              "Content-Type": "application/json",
              "OData-Version": "4.0",
              Accept: "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            method: "GET",
          }
        );
        return result;
      } catch (error) {
        throw error;
      }
    },
    getKpiEntryByAcUserAndTime: async (
      acUserId: string,
      beginMonth: string,
      beginYear: string,
      endMonth: string,
      endYear: string
    ) => {
      try {
        const result = await fetch(
          `${process.env.DYNAMICS_CRM_ROOT_URL}/api/data/v9.0/ac_kpientries?$orderby=createdon desc&$filter=_ac_submitter_value eq ${acUserId} and ac_month ge ${beginMonth} and ac_month le ${endMonth} and ac_year ge ${beginYear} and ac_year le ${endYear}&$select=ac_month,ac_year,ac_totalmarketinginvestment,ac_numberofleadtotal,ac_numberofondeckcalls,ac_numberofdiagnostics,ac_numberofnewclients&$expand=ac_Submitter($select=ac_name),transactioncurrencyid($select=isocurrencycode)`,
          {
            headers: {
              "Content-Type": "application/json",
              "OData-Version": "4.0",
              Accept: "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            method: "GET",
          }
        );
        return result;
      } catch (error) {
        throw error;
      }
    },
    getKpiEntriesByListOfAcPartners: async (acPartners: any[]) => {
      try {
        const filters: string[] = [];
        acPartners.forEach((ac: any) => {
          filters.push(`_ac_submitter_value eq ${ac.ac_actioncoachpartnerid}`);
        });
        const filterString = filters.join(" or ");
        const result = await fetch(
          `${process.env.DYNAMICS_CRM_ROOT_URL}/api/data/v9.0/ac_kpientries?$orderby=_ac_submitter_value asc&$filter=${filterString}&$select=ac_month,ac_year,ac_totalmarketinginvestment,ac_cashbank,ac_numberofleadtotal,ac_numberofondeckcalls,ac_numberofdiagnostics,ac_numberofnewclients&$expand=ac_Submitter($select=ac_name),transactioncurrencyid($select=isocurrencycode)`,
          {
            headers: {
              "Content-Type": "application/json",
              "OData-Version": "4.0",
              Accept: "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            method: "GET",
          }
        );
        return result;
      } catch (error) {
        throw error;
      }
    },
    getKpiEntriesByListOfAcPartnersAndTime: async (
      acPartners: any[],
      beginMonth: string,
      beginYear: string,
      endMonth: string,
      endYear: string
    ) => {
      try {
        const filters: string[] = [];
        acPartners.forEach((ac: any) => {
          filters.push(`_ac_submitter_value eq ${ac.ac_actioncoachpartnerid}`);
        });
        const filterString = filters.join(" or ");
        const result = await fetch(
          `${process.env.DYNAMICS_CRM_ROOT_URL}/api/data/v9.0/ac_kpientries?$orderby=_ac_submitter_value asc&$filter=(${filterString}) and ac_month ge ${beginMonth} and ac_month le ${endMonth} and ac_year ge ${beginYear} and ac_year le ${endYear}&$select=ac_month,ac_year,ac_totalmarketinginvestment,ac_cashbank,ac_numberofleadtotal,ac_numberofondeckcalls,ac_numberofdiagnostics,ac_numberofnewclients&$expand=ac_Submitter($select=ac_name),transactioncurrencyid($select=isocurrencycode)`,
          {
            headers: {
              "Content-Type": "application/json",
              "OData-Version": "4.0",
              Accept: "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            method: "GET",
          }
        );
        return result;
      } catch (error) {
        throw error;
      }
    },
    getKpiTotalForMlByTime: async (
      acMlId: string,
      beginMonth: string,
      beginYear: string,
      endMonth: string,
      endYear: string
    ) => {
      try {
        const result = await fetch(
          `${
            process.env.DYNAMICS_CRM_ROOT_URL
          }/api/data/v9.0/ac_kpientries?fetchXml=${encodeURI(
            KpiTotalForMlByTime(
              acMlId,
              beginMonth,
              beginYear,
              endMonth,
              endYear
            )
          )}`,
          {
            headers: {
              "Content-Type": "application/json",
              "OData-Version": "4.0",
              Accept: "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            method: "GET",
          }
        );
        return result;
      } catch (error) {
        throw error;
      }
    },
    getKpiListForMlByTime: async (
      acMlId: string,
      beginMonth: string,
      beginYear: string,
      endMonth: string,
      endYear: string
    ) => {
      try {
        const result = await fetch(
          `${
            process.env.DYNAMICS_CRM_ROOT_URL
          }/api/data/v9.0/ac_kpientries?fetchXml=${encodeURI(
            ListOfKpiForMlAndSubUserByTime(
              acMlId,
              beginMonth,
              beginYear,
              endMonth,
              endYear
            )
          )}`,
          {
            headers: {
              "Content-Type": "application/json",
              "OData-Version": "4.0",
              Accept: "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            method: "GET",
          }
        );
        return result;
      } catch (error) {
        throw error;
      }
    },
    getKpiListForMl: async (acMlId: string) => {
      try {
        const result = await fetch(
          `${
            process.env.DYNAMICS_CRM_ROOT_URL
          }/api/data/v9.0/ac_kpientries?fetchXml=${encodeURI(
            ListOfKpiForMlAndSubUser(acMlId)
          )}`,
          {
            headers: {
              "Content-Type": "application/json",
              "OData-Version": "4.0",
              Accept: "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            method: "GET",
          }
        );
        return result;
      } catch (error) {
        throw error;
      }
    },
    getKpiTotalForMl: async (acMlId: string) => {
      try {
        const result = await fetch(
          `${process.env.DYNAMICS_CRM_ROOT_URL}/api/data/v9.0/ac_kpientries?$apply=filter(ac_Submitter/_ac_parentactioncoachuser_value eq ${acMlId} or _ac_submitter_value eq ${acMlId})/aggregate(ac_totalmarketinginvestment with sum as cashbanktotal,ac_numberofleadtotal with sum as totallead,ac_numberofondeckcalls with sum as totalondeckcalls,ac_numberofdiagnostics with sum as totaldiagnostics,ac_numberofnewclients with sum as totalnewclients)`,
          {
            headers: {
              "Content-Type": "application/json",
              "OData-Version": "4.0",
              Accept: "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            method: "GET",
          }
        );
        return result;
      } catch (error) {
        throw error;
      }
    },
    getKpiTotalForAllMlByTime: async (
      beginMonth: string,
      beginYear: string,
      endMonth: string,
      endYear: string
    ) => {
      try {
        const result = await fetch(
          `${
            process.env.DYNAMICS_CRM_ROOT_URL
          }/api/data/v9.0/ac_kpientries?fetchXml=${encodeURI(
            GroupAllKpiEntriesBySubmitterParentUserAndFilterByTime(
              beginMonth,
              beginYear,
              endMonth,
              endYear
            )
          )}`,
          {
            headers: {
              "Content-Type": "application/json",
              "OData-Version": "4.0",
              Accept: "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            method: "GET",
          }
        );
        return result;
      } catch (error) {
        throw error;
      }
    },
    getKpiTotalForAllMl: async () => {
      try {
        const result = await fetch(
          `${
            process.env.DYNAMICS_CRM_ROOT_URL
          }/api/data/v9.0/ac_kpientries?fetchXml=${encodeURI(
            GroupAllKpiEntriesBySubmitterParentUser
          )}`,
          {
            headers: {
              "Content-Type": "application/json",
              "OData-Version": "4.0",
              Accept: "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            method: "GET",
          }
        );
        return result;
      } catch (error) {
        throw error;
      }
    },
  };
};
