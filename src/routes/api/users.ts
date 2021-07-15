import express from "express";
import { Session } from "express-session";
import { MASTER_LICENSEE_TYPE } from "../../utils/constants";
import { recursivelyGetAllChildCompanies } from "../../utils/recursivelyGetAllChildCompaniesId";
import { actionCoachUser } from "../../webApis/actionCoachUser";

export type ExpressRequest = Request & {
  session: Session & { accessToken?: string };
} & {
  app: express.Application;
};

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    if (!req.query.email) {
      return res
        .status(400)
        .json({ message: "Missing user email information." });
    }
    const user = await actionCoachUser(
      req.app.locals.accessToken
    ).getAcPartnerByEmail(req.query.email as string);
    if (user.value.length === 0) {
      return res.status(404).json({
        message: `You are not an ActionCoach User.`,
      });
    }
    return res.status(200).json(user.value[0]);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

router.get("/:acPartnerId/coaches", async (req, res) => {
  try {
    const acPartnerId = req.params.acPartnerId;
    const acPartner = await actionCoachUser(
      req.app.locals.accessToken
    ).getAcPartnerById(acPartnerId);
    if (acPartner._ac_partnertype_value !== MASTER_LICENSEE_TYPE) {
      res.status(400).json({
        message:
          "You need to be a Master Licensee to view Coaches information.",
      });
    }

    const companies: string[] = [acPartner._ac_partnercompany_value];
    const result = await recursivelyGetAllChildCompanies(
      companies,
      [acPartner._ac_partnercompany_value],
      req.app.locals.accessToken
    );
    const coaches = await actionCoachUser(
      req.app.locals.accessToken
    ).getCoachesByPartnerCompanyIds(result);
    return res.status(200).json(coaches.value);
  } catch (error) {
    return res.status(400).json(error);
  }
});

export default router;
