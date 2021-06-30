import express, { Request, Response } from "express";
import { Session } from "express-session";
import "isomorphic-fetch";
import fetch from "../../utils/nodeFetchJson";

export type ExpressRequest = Request & {
  session: Session & { accessToken?: string };
} & {
  app: express.Application;
};

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const result = await fetch(
      "https://actioncoachsystems.crm.dynamics.com/api/data/v9.1/ac_regions?$select=ac_name&$filter=statecode%20eq%200&$count=true",
      { headers: { authorization: `Bearer ${req.app.locals.accessToken}` } }
    );

    return res.status(200).json(result);
  } catch (error) {
    return res.status(error.response.status).json(error.data);
  }
});

export default router;
