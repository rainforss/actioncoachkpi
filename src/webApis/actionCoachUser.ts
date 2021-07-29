import fetch from "../utils/nodeFetchJson";

export const actionCoachUser = (accessToken: string) => {
  return {
    getAcPartnerByEmail: async (email: string) => {
      try {
        const result = await fetch(
          `${process.env.DYNAMICS_CRM_ROOT_URL}/api/data/v9.0/ac_actioncoachpartners?$filter=ac_email eq '${email}'&$select=ac_name,_ac_partnercompany_value,_ac_partnertype_value,_ownerid_value&$expand=ac_PartnerCompany($select=ac_name;$expand=transactioncurrencyid($select=isocurrencycode)),ac_PartnerType($select=ac_name)`,
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
    getAcPartnerById: async (acPartnerId: string) => {
      try {
        const result = await fetch(
          `${process.env.DYNAMICS_CRM_ROOT_URL}/api/data/v9.0/ac_actioncoachpartners(${acPartnerId})?$select=ac_name,_ac_partnercompany_value,_ac_partnertype_value,_ownerid_value&$expand=ac_PartnerCompany($select=ac_name;$expand=transactioncurrencyid($select=isocurrencycode)),ac_PartnerType($select=ac_name)`,
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
    getCoachesByPartnerCompanyIds: async (companyIds: string[]) => {
      try {
        const filters: string[] = [];
        companyIds.forEach((Id: any) => {
          filters.push(`_ac_partnercompany_value eq ${Id}`);
        });
        const filterString = filters.join(" or ");
        const result = await fetch(
          `${process.env.DYNAMICS_CRM_ROOT_URL}/api/data/v9.0/ac_actioncoachpartners?$filter=(${filterString}) and _ac_partnertype_value eq '27f7dce2-29e4-eb11-bacb-002248086b38'&$select=ac_name`,
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
    getChildCompaniesByParentCompanyIds: async (parentCompanyIds: string[]) => {
      try {
        const filters: string[] = [];
        parentCompanyIds.forEach((Id: any) => {
          filters.push(`_ac_parentpartnercompany_value eq ${Id}`);
        });
        const filterString = filters.join(" or ");
        const result = await fetch(
          `${process.env.DYNAMICS_CRM_ROOT_URL}/api/data/v9.0/ac_actioncoachpartnercompanies?$filter=${filterString}&$select=ac_name`,
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
