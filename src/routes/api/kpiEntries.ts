import express from "express";
import { Session } from "express-session";
import { recursivelyGetAllChildCompanies } from "../../utils/recursivelyGetAllChildCompaniesId";
import { actionCoachUser } from "../../webApis/actionCoachUser";
import { kpiEntry } from "../../webApis/kpiEntry";
import { KpiEntry } from "../../types";

export type ExpressRequest = Request & {
  session: Session & { accessToken?: string };
} & {
  app: express.Application;
};

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    //If no AC Partner ID is present in the query string, return error
    const ac_submitter = req.query.acUserId as string;
    if (!ac_submitter) {
      return res.status(400).json({ message: "Missing ActionCoach User Id." });
    }

    //Get the AC Partner using the Ac Partner ID provided in query string, if no record is found, return error
    const user = await actionCoachUser(
      req.app.locals.accessToken
    ).getAcPartnerById(ac_submitter);
    if (!user) {
      return res.status(404).json({
        message: `ID ${ac_submitter} does not correspond to an existing ActionCoach Partner profile.`,
      });
    }

    //If querying KPI Entry records with time range, return KPI Entry records with time filter
    if (
      req.query.beginMonth &&
      req.query.beginYear &&
      req.query.endMonth &&
      req.query.endYear
    ) {
      const result = await kpiEntry(
        req.app.locals.accessToken
      ).getKpiEntryByAcUserAndTime(
        ac_submitter,
        req.query.beginMonth as string,
        req.query.beginYear as string,
        req.query.endMonth as string,
        req.query.endYear as string
      );
      return res.status(200).json(result.value);
    }

    //If no time range specified in query, return all KPI Entry records submitted by AC Partner.
    const result = await kpiEntry(
      req.app.locals.accessToken
    ).getKpiEntryByAcUser(ac_submitter);
    return res.status(200).json(result.value);
  } catch (error) {
    return res.status(400).json(error);
  }
});

//Currently not being used. Reports are generated in D365
router.get("/aggregate", async (req, res) => {
  try {
    const acMlId = req.query.acMlId;
    if (!acMlId) {
      if (
        req.query.beginMonth &&
        req.query.beginYear &&
        req.query.endMonth &&
        req.query.endYear
      ) {
        const result = await kpiEntry(
          req.app.locals.accessToken
        ).getKpiTotalForAllMlByTime(
          req.query.beginMonth as string,
          req.query.beginYear as string,
          req.query.endMonth as string,
          req.query.endYear as string
        );
        return res.status(200).json(result.value);
      }
      const result = await kpiEntry(
        req.app.locals.accessToken
      ).getKpiTotalForAllMl();
      return res.status(200).json(result.value);
    }

    if (
      req.query.beginMonth &&
      req.query.beginYear &&
      req.query.endMonth &&
      req.query.endYear
    ) {
      const result = await kpiEntry(
        req.app.locals.accessToken
      ).getKpiTotalForMlByTime(
        acMlId as string,
        req.query.beginMonth as string,
        req.query.beginYear as string,
        req.query.endMonth as string,
        req.query.endYear as string
      );
      return res.status(200).json(result.value);
    }
    const result = await kpiEntry(req.app.locals.accessToken).getKpiTotalForMl(
      acMlId as string
    );
    return res.status(200).json(result.value);
  } catch (error) {
    return res.status(400).json(error);
  }
});

//Used to list all KPI Entry records for AC Partner (ML or Coaches)
router.get("/listall", async (req, res) => {
  try {
    const acPartnerId = req.query.acPartnerId;

    //If no AC Partner Id in the query string, return error
    if (!acPartnerId) {
      return res
        .status(400)
        .json({ message: "Missing ActionCoach Partner ID." });
    }

    //Get AC Partner record from Dataverse using the Id
    const acPartner = await actionCoachUser(
      req.app.locals.accessToken
    ).getAcPartnerById(acPartnerId as string);

    //If ACPartner is a Master Licensee, recursively get all AC Partner Company records under its company and the parent company itself
    if (
      acPartner._ac_partnertype_value === "6f95a9d6-29e4-eb11-bacb-002248086b38"
    ) {
      const companies: string[] = [acPartner._ac_partnercompany_value];
      const result = await recursivelyGetAllChildCompanies(
        companies,
        [acPartner._ac_partnercompany_value],
        req.app.locals.accessToken
      );

      //Using the retrieved company records, get all Coaches under these companies
      const coaches = await actionCoachUser(
        req.app.locals.accessToken
      ).getCoachesByPartnerCompanyIds(result);

      //Retrieve all KPI Entry records submitted by ML and the coaches
      const acPartnerAndCoaches = [acPartner, ...coaches.value];
      if (
        req.query.beginMonth &&
        req.query.beginYear &&
        req.query.endMonth &&
        req.query.endYear
      ) {
        const kpiEntries = await kpiEntry(
          req.app.locals.accessToken
        ).getKpiEntriesByListOfAcPartnersAndTime(
          acPartnerAndCoaches,
          req.query.beginMonth as string,
          req.query.beginYear as string,
          req.query.endMonth as string,
          req.query.endYear as string
        );
        return res.status(200).json(kpiEntries.value);
      }
      const kpiEntries = await kpiEntry(
        req.app.locals.accessToken
      ).getKpiEntriesByListOfAcPartners(acPartnerAndCoaches);
      return res.status(200).json(kpiEntries.value);
    }

    //If ACPartner is Coach, only retrieve KPI Entry records submitted by the coach.
    if (
      req.query.beginMonth &&
      req.query.beginYear &&
      req.query.endMonth &&
      req.query.endYear
    ) {
      const kpiEntries = await kpiEntry(
        req.app.locals.accessToken
      ).getKpiEntriesByListOfAcPartnersAndTime(
        [acPartner],
        req.query.beginMonth as string,
        req.query.beginYear as string,
        req.query.endMonth as string,
        req.query.endYear as string
      );
      return res.status(200).json(kpiEntries.value);
    }
    const kpiEntries = await kpiEntry(
      req.app.locals.accessToken
    ).getKpiEntriesByListOfAcPartners([acPartner]);
    return res.status(200).json(kpiEntries.value);
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const { ac_submitter, cashBank, ...nonBindingData } = req.body;

    //Get the AC Partner using the submitter ID
    const user = await actionCoachUser(
      req.app.locals.accessToken
    ).getAcPartnerById(ac_submitter);

    //If no AC Partner with provided ID is found, deny data write and return error
    if (!user) {
      return res.status(400).json({
        message: `ID ${ac_submitter} does not correspond to an existing ActionCoach User.`,
      });
    }

    const kpiEntryData = {
      ...nonBindingData,
    };
    const index = cashBank.findIndex((c: any) => c.coach === ac_submitter);
    if (index === -1) {
      return res.status(400).json({
        message: `Submitter ${user.ac_name} is missing Cash Bank information.`,
      });
    }
    const userOwnCashBank = cashBank.splice(index, 1);
    kpiEntryData.ac_cashbank = userOwnCashBank[0].value;
    kpiEntryData[
      "ac_Submitter@odata.bind"
    ] = `/ac_actioncoachpartners(${ac_submitter})`;
    kpiEntryData[
      "transactioncurrencyid@odata.bind"
    ] = `/transactioncurrencies(${user.ac_PartnerCompany.transactioncurrencyid.transactioncurrencyid})`;

    //Set the owner of the record to be the owner of AC Partner record
    kpiEntryData["ownerid@odata.bind"] = `/systemusers(${user._ownerid_value})`;

    const promises: any[] = [];
    cashBank.forEach((c: any) => {
      const kpi = new KpiEntry();
      kpi["ac_Submitter@odata.bind"] = `/ac_actioncoachpartners(${c.coach})`;
      kpi["ownerid@odata.bind"] = `/systemusers(${user._ownerid_value})`;
      kpi[
        "transactioncurrencyid@odata.bind"
      ] = `/transactioncurrencies(${user.ac_PartnerCompany.transactioncurrencyid.transactioncurrencyid})`;
      kpi.ac_year = nonBindingData.ac_year;
      kpi.ac_month = nonBindingData.ac_month;
      kpi.ac_cashbank = c.value;
      promises.push(kpiEntry(req.app.locals.accessToken).createKpiEntry(kpi));
    });
    promises.push(
      kpiEntry(req.app.locals.accessToken).createKpiEntry(kpiEntryData)
    );
    const result = await Promise.all(promises);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json(error);
  }
});

export default router;
